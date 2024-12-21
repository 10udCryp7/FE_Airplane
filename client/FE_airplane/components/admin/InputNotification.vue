<template>
  <section class="bg-gray-100 p-6 w-full flex flex-col">
    <h3 class="text-2xl font-bold text-center mb-6">Đăng thông tin</h3>
    <h3 class="text-lg font-semibold mb-2">Title</h3>
    <input v-model="newTitle" placeholder="Enter title here..." class="w-full p-2 mb-4 border border-gray-300 rounded"/>

    <h3 class="text-lg font-semibold mb-2">Description</h3>
    <textarea
      v-model="newPost"
      placeholder="Enter description here..."
      class="w-full p-2 mb-4 border border-gray-300 rounded"
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

    <button @click="postInfoWithImage" class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">Đăng thông tin</button>

    <h3 class="text-2xl font-bold text-center mt-8">Danh sách thông báo</h3>
    <div v-if="notifications.length" class="overflow-auto max-h-96">
  <table class="w-full border-collapse mt-4">
    <thead>
      <tr class="bg-gray-200 text-left">
        <th class="p-3 border">ID</th>
        <th class="p-3 border">Title</th>
        <th class="p-3 border">Description</th>
        <th class="p-3 border">Content</th>
        <th class="p-3 border">Post Date</th>
        <th class="p-3 border">Type</th>
        <th class="p-3 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(notification, index) in notifications" :key="index" class="odd:bg-white even:bg-gray-50">
        <td class="p-3 border">{{ notification.postId }}</td>
        <td class="p-3 border">{{ notification.title }}</td>
        <td class="p-3 border">{{ notification.description }}</td>
        <td class="p-3 border">
          <img
            :src="'data:image/png;base64,' + notification.content"
            alt="Notification Content"
            class="max-w-24"
          />
        </td>
        <td class="p-3 border">{{ notification.postDate }}</td>
        <td class="p-3 border">{{ notification.type }}</td>
        <td class="p-3 border">
          <button @click="deleteNotification(notification.postId)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Xóa</button>
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