<template>
  <div
    class="flex flex-grow flex-col lg:items-center lg:align-middle lg:flex-row space-x-5 border-t border-t-white border-b-white lg:border-t-0 lg:border-b-0"
  >
    <div @click="toggleTheme()" class="flex sm:flex-col lg:flex-row ml-3 py-3">
      <input type="checkbox" name="light-switch" class="light-switch sr-only" />
      <label for="light-switch" class="relative cursor-pointer p-2 hover:text-gray-900 dark:hover:text-yellow-500">
        <svg
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-moon dark:hidden"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"
          />
        </svg>
        <svg width="16" height="16" class="hidden dark:block dark:fill-yellow-200" xmlns="http://www.w3.org/2000/svg">
          <path
            class="hidden dark:block dark:fill-yellow-200"
            d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
          />
          <path d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>
      </label>
    </div>
    <NuxtLink
      href="/login"
      class="flex items-center text-gray-500 hover:text-green-500 dark:text-gray dark:hover:text-green-500 cursor-pointer transition-colors duration-300 py-3"
    >
      <FontAwesomeIcon icon="fa-solid fa-sign-out" class="mr-3" />
      Login
    </NuxtLink>
  </div>
</template>
