<template>
    <div>
      <input type="file" ref="fileInput" @change="handleFileUpload">
      <button @click="uploadFile">Upload</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleFileUpload() {
        this.selectedFile = this.$refs.fileInput.files[0];
      },
      uploadFile() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        fetch('api/post/post_uploadS3broswer', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            console.log('File uploaded successfully');
          } else {
            throw new Error('Failed to upload file');
          }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
      }
    }
  }
  </script>
  