<template>
  <div class="content">
    <span class="createdAt">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
      2023-04-20
    </span>
    <h1 class="title">제1회 kakao tech meet에 초대합니다!</h1>
    <div>
      카카오의카카오의카카오의카카오의카카오의카카오의<br />
      카카오의카카오의카카오의카카오의카카오의카카오의카카오의카카오의카카오의카카오의
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.content {
  width: 80%;
  flex-shrink: 1;
}
.createdAt {
  font-size: 14px;
  color: #777;
}
.createdAt .icon {
  width: 14px;
}
.title {
  font-size: 40px;
  font-weight: 700;
}
</style>
