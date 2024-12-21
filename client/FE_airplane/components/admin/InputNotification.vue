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
    </section>
  </template>
  
  <script setup>
  // Dữ liệu cho phần "Đăng thông tin"
  import axios from "axios";
  import { ref } from "vue";
  
  const newTitle = ref("");
  const newPost = ref("");
  const imageFile = ref(null);
  const imagePreview = ref("");
  const postType = ref("promotion"); // Giá trị mặc định là promotion
  
  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageFile.value = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result; // Hiển thị ảnh xem trước
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Hàm đăng thông tin với ảnh
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
    // postDate = today
    formData.append("postDate", new Date().toISOString());  
    try {
      const response = await axios.post("http://localhost:3456/api/notification", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
  
      // Hiển thị thông tin đã đăng (hoặc thực hiện gọi API tại đây)
      alert("Đăng thông tin thành công!");
    } catch (err) {
      console.error("Đăng thông tin thất bại:", err);
    }
  
    // Xóa dữ liệu sau khi đăng
    newTitle.value = "";
    newPost.value = "";
    imageFile.value = null;
    imagePreview.value = "";
    postType.value = "promotion"; // Reset về giá trị mặc định
  };
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
  