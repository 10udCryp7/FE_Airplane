<template>
  <section>
    <h3>Title</h3>
    <input v-model="newTitle" placeholder="Enter title here..." />

    <h3>Description</h3>
    <textarea
      v-model="newPost"
      placeholder="Enter description here..."
    ></textarea>

    <!-- Đăng ảnh -->
    <div class="upload-image">
      <label for="imageUpload">Chọn ảnh:</label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        @change="handleImageUpload"
      />
      <div v-if="imagePreview" class="image-preview">
        <h4>Ảnh xem trước:</h4>
        <img :src="imagePreview" alt="Ảnh xem trước" />
      </div>
    </div>

    <h3>Type</h3>
    <div class="type-selection">
      <label>
        <input type="radio" v-model="postType" value="promotion" /> Promotion
      </label>
      <label>
        <input type="radio" v-model="postType" value="news" /> News
      </label>
    </div>

    <button @click="postInfoWithImage">Đăng thông tin</button>

    <h3>Danh sách thông báo</h3>
    <div v-if="notifications.length" style="overflow: auto; max-height: 400px">
      <table border="1" style="width: 100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Content</th>
            <th>Post Date</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notification, index) in notifications" :key="index">
            <td>{{ notification.postId }}</td>
            <td>{{ notification.title }}</td>
            <td>{{ notification.description }}</td>
            <td>
              <img
                :src="notification.content"
                alt="Notification Content"
                style="max-width: 100px"
              />
            </td>
            <td>{{ notification.postDate }}</td>
            <td>{{ notification.type }}</td>
            <td>
              <button @click="deleteNotification(notification.postId)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Không có thông báo để hiển thị.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const newTitle = ref("");
const newPost = ref("");
const imageFile = ref(null);
const imagePreview = ref("");
const postType = ref("promotion"); // Giá trị mặc định là promotion

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const postInfoWithImage = async () => {
  if (!newTitle.value || !newPost.value || !postType.value) {
    alert("Vui lòng nhập đầy đủ thông tin trước khi đăng!");
    return;
  }

  const formData = new FormData();
  formData.append("title", newTitle.value);
  formData.append("description", newPost.value);
  formData.append("type", postType.value);
  if (imageFile.value) {
    formData.append("image", imageFile.value);
  }
  formData.append("postDate", new Date().toISOString());

  try {
    const response = await axios.post(
      "http://localhost:3456/api/notification",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);

    alert("Đăng thông tin thành công!");
    fetchResponses();
  } catch (err) {
    console.error("Đăng thông tin thất bại:", err);
  }

  newTitle.value = "";
  newPost.value = "";
  imageFile.value = null;
  imagePreview.value = "";
  postType.value = "promotion";
};

var notifications = ref([]);

const fetchResponses = async () => {
  try {
    const response = await axios.get("http://localhost:3456/api/notification", {
      withCredentials: true,
    });
    console.log(response.data);
    notifications.value = response.data.notifications;
  } catch (error) {
    console.error("Error fetching responses:", error);
  }
};
const deleteNotification = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
    return;
  }
  console.log("id" + id);
  try {
    await axios.delete(`http://localhost:3456/api/notification/${id}`);
    alert("Xóa thông báo thành công!");
    fetchResponses(); // Cập nhật lại danh sách
  } catch (err) {
    console.error("Xóa thông báo thất bại:", err);
    alert("Không thể xóa thông báo. Vui lòng thử lại!");
  }
};

onMounted(() => {
  fetchResponses();
});
</script>

<style scoped>
.type-selection {
  margin: 10px 0;
}
.type-selection label {
  margin-right: 15px;
}
.upload-image {
  margin: 15px 0;
}
.image-preview img {
  max-width: 200px;
  margin-top: 10px;
}
</style>
