<script setup>
definePageMeta({
  layout: 't-main-layout',
})

function sample() {
  if (process.browser) {
    document.getElementById('tSampleThemes').click()
  }
}
onMounted(() => {
  toastEm({ val: 'Press opt/alt+s to sample a style', type: 'info', autoClose: false })
})
</script>
<template>
  <div>
    <!-- <div class="navbar bg-base-100">
      <a class="btn btn-ghost text-xl">Turbo</a>
    </div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Turbo</a>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="navbar bg-base-100">
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Turbo</a>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Turbo</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2 bg-base-100 rounded-t-none">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Turbo</a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Turbo</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-5xl">Turbo <span class="brandName"></span></a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div> -->
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><button @click="sample">Sample Themes</button></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">Turbo</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><button @click="sample">Sample Themes</button></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <a class="btn">Button</a>
      </div>
    </div>
    <!-- <div class="navbar bg-neutral text-neutral-content">
      <button class="btn btn-ghost text-xl">Turbo</button>
    </div>
    <div class="navbar bg-base-300">
      <button class="btn btn-ghost text-xl">Turbo</button>
    </div>
    <div class="navbar bg-primary text-primary-content">
      <button class="btn btn-ghost text-xl">Turbo</button>
    </div> -->
  </div>
  <div class="bg-base-100 text-center text-5xl">Turbo<span class="brandName"></span></div>
  <div class="grid grid-cols-4 gap-4 place-items-stretch bg-base-100">
    <div class="cols-span-4 space-x-2 space-y-2 p-2 m-2">
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a>Home</a></li>
          <li><a>Documents</a></li>
          <li>Add Document</li>
        </ul>
      </div>
      <div class="max-w-xs text-sm breadcrumbs">
        <ul>
          <li>Long text 1</li>
          <li>Long text 2</li>
          <li>Long text 3</li>
          <li>Long text 4</li>
          <li>Long text 5</li>
        </ul>
      </div>
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Documents
            </a>
          </li>
          <li>
            <span class="inline-flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Add Document
            </span>
          </li>
        </ul>
      </div>

      <ul>
        <span class="loading loading-spinner text-primary"></span>
        <span class="loading loading-spinner text-secondary"></span>
        <span class="loading loading-spinner text-accent"></span>
        <span class="loading loading-spinner text-neutral"></span>
        <span class="loading loading-spinner text-info"></span>
        <span class="loading loading-spinner text-success"></span>
        <span class="loading loading-spinner text-warning"></span>
        <span class="loading loading-spinner text-error"></span>
      </ul>
      <ul>
        <span class="loading loading-dots loading-xs"></span>
        <span class="loading loading-dots loading-sm"></span>
        <span class="loading loading-dots loading-md"></span>
        <span class="loading loading-dots loading-lg"></span>
        <span class="loading loading-ring loading-xs"></span>
        <span class="loading loading-ring loading-sm"></span>
        <span class="loading loading-ring loading-md"></span>
        <span class="loading loading-ring loading-lg"></span>
      </ul>
      <ul>
        <span class="loading loading-ball loading-xs"></span>
        <span class="loading loading-ball loading-sm"></span>
        <span class="loading loading-ball loading-md"></span>
        <span class="loading loading-ball loading-lg"></span>
        <span class="loading loading-infinity loading-xs"></span>
        <span class="loading loading-infinity loading-sm"></span>
        <span class="loading loading-infinity loading-md"></span>
        <span class="loading loading-infinity loading-lg"></span>
      </ul>

      <progress class="progress w-56" value="0" max="100"></progress>
      <progress class="progress w-56" value="10" max="100"></progress>
      <progress class="progress w-56" value="40" max="100"></progress>
      <progress class="progress w-56" value="70" max="100"></progress>
      <progress class="progress w-56" value="100" max="100"></progress>
      <progress class="progress progress-primary w-56" value="0" max="100"></progress>
      <progress class="progress progress-primary w-56" value="10" max="100"></progress>
      <progress class="progress progress-primary w-56" value="40" max="100"></progress>
      <progress class="progress progress-primary w-56" value="70" max="100"></progress>
      <progress class="progress progress-primary w-56" value="100" max="100"></progress>
      <progress class="progress progress-secondary w-56" value="0" max="100"></progress>
      <progress class="progress progress-secondary w-56" value="10" max="100"></progress>
      <progress class="progress progress-secondary w-56" value="40" max="100"></progress>
      <progress class="progress progress-secondary w-56" value="70" max="100"></progress>
      <progress class="progress progress-secondary w-56" value="100" max="100"></progress>
      <progress class="progress progress-accent w-56" value="0" max="100"></progress>
      <progress class="progress progress-accent w-56" value="10" max="100"></progress>
      <progress class="progress progress-accent w-56" value="40" max="100"></progress>
      <progress class="progress progress-accent w-56" value="70" max="100"></progress>
      <progress class="progress progress-accent w-56" value="100" max="100"></progress>
      <progress class="progress progress-success w-56" value="0" max="100"></progress>
      <progress class="progress progress-success w-56" value="10" max="100"></progress>
      <progress class="progress progress-success w-56" value="40" max="100"></progress>
      <progress class="progress progress-success w-56" value="70" max="100"></progress>
      <progress class="progress progress-success w-56" value="100" max="100"></progress>
      <progress class="progress progress-info w-56" value="0" max="100"></progress>
      <progress class="progress progress-info w-56" value="10" max="100"></progress>
      <progress class="progress progress-info w-56" value="40" max="100"></progress>
      <progress class="progress progress-info w-56" value="70" max="100"></progress>
      <progress class="progress progress-info w-56" value="100" max="100"></progress>
      <progress class="progress progress-warning w-56" value="0" max="100"></progress>
      <progress class="progress progress-warning w-56" value="10" max="100"></progress>
      <progress class="progress progress-warning w-56" value="40" max="100"></progress>
      <progress class="progress progress-warning w-56" value="70" max="100"></progress>
      <progress class="progress progress-warning w-56" value="100" max="100"></progress>
      <progress class="progress progress-error w-56" value="0" max="100"></progress>
      <progress class="progress progress-error w-56" value="10" max="100"></progress>
      <progress class="progress progress-error w-56" value="40" max="100"></progress>
      <progress class="progress progress-error w-56" value="70" max="100"></progress>
      <progress class="progress progress-error w-56" value="100" max="100"></progress>
      <progress class="progress w-56"></progress>
      <input type="range" min="0" max="100" value="40" class="range" />
      <input type="range" min="0" max="100" value="25" class="range" step="25" />
      <div class="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <input type="range" min="0" max="100" value="40" class="range range-primary" />
      <input type="range" min="0" max="100" value="40" class="range range-secondary" />
      <input type="range" min="0" max="100" value="40" class="range range-accent" />
      <input type="range" min="0" max="100" value="40" class="range range-success" />
      <input type="range" min="0" max="100" value="40" class="range range-warning" />
      <input type="range" min="0" max="100" value="40" class="range range-info" />
      <input type="range" min="0" max="100" value="40" class="range range-error" />

      <div class="join join-vertical">
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Default"
          value="default"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Retro"
          value="retro"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Cyberpunk"
          value="cyberpunk"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Valentine"
          value="valentine"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Aqua"
          value="aqua"
        />
      </div>
    </div>
    <div class="cols-span-4 space-x-2 space-y-2 p-2 m-2">
      <div class="space-x-2 space-y-2 p-2 m-2">
        <h1 class="primary-content">Colors Branded</h1>
        <button class="btn">Button</button>
        <button class="btn btn-neutral">Neutral</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-link">Link</button>
        <h1 class="primary-content">Colors State colors</h1>
        <button class="btn btn-info">Info</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-error">Error</button>
        <h1 class="primary-content">Outline</h1>
        <button class="btn btn-outline">Default</button>
        <button class="btn btn-outline btn-primary">Primary</button>
        <button class="btn btn-outline btn-secondary">Secondary</button>
        <button class="btn btn-outline btn-accent">Accent</button>
        <div class="space-x-2 space-y-2 p-2 m-2">
          <h1>Shaped</h1>
          <button class="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button class="btn btn-square btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button class="btn btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button class="btn btn-circle btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button class="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Button
          </button>
          <button class="btn">
            Button
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="my-6 space-y-6">
        <ul class="steps">
          <li class="step step-primary">Register</li>
          <li class="step step-primary">Choose plan</li>
          <li class="step">Purchase</li>
          <li class="step">Receive Product</li>
        </ul>
        <div class="overflow-x-auto">
          <ul class="steps">
            <li class="step">start</li>
            <li class="step step-secondary">2</li>
            <li class="step step-secondary">3</li>
            <li class="step step-secondary">4</li>
            <li class="step">5</li>
            <li class="step step-accent">6</li>
            <li class="step step-accent">7</li>
            <li class="step">8</li>
            <li class="step step-error">9</li>
            <li class="step step-error">10</li>
            <li class="step">11</li>
            <li class="step">12</li>
            <li class="step step-warning">13</li>
            <li class="step step-warning">14</li>
            <li class="step">15</li>
            <li class="step step-neutral">16</li>
            <li class="step step-neutral">17</li>
            <li class="step step-neutral">18</li>
            <li class="step step-neutral">19</li>
            <li class="step step-neutral">20</li>
            <li class="step step-neutral">21</li>
            <li class="step step-neutral">22</li>
            <li class="step step-neutral">23</li>
            <li class="step step-neutral">end</li>
          </ul>
        </div>
        <ul class="steps">
          <li class="step step-info">Fly to moon</li>
          <li class="step step-info">Shrink the moon</li>
          <li class="step step-info">Grab the moon</li>
          <li class="step step-error" data-content="?">Sit on toilet</li>
        </ul>
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li class="step step-primary">Register</li>
          <li class="step step-primary">Choose plan</li>
          <li class="step">Purchase</li>
          <li class="step">Receive Product</li>
        </ul>
      </div>

      <!-- xs -->
      <input type="text" placeholder="Type here" class="input input-bordered input-xs w-full max-w-xs" />
      <!-- sm -->
      <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
      <!-- md -->
      <input type="text" placeholder="Type here" class="input input-bordered input-md w-full max-w-xs" />
      <!-- lg -->
      <input type="text" placeholder="Type here" class="input input-bordered input-lg w-full max-w-xs" />

      <div class="badge">default</div>
      <div class="badge badge-neutral">neutral</div>
      <div class="badge badge-primary">primary</div>
      <div class="badge badge-secondary">secondary</div>
      <div class="badge badge-accent">accent</div>
      <div class="badge badge-ghost">ghost</div>
      <div class="badge badge-outline">default</div>
      <div class="badge badge-primary badge-outline">primary</div>
      <div class="badge badge-secondary badge-outline">secondary</div>
      <div class="badge badge-accent badge-outline">accent</div>
      <div class="badge badge-lg">987,654</div>
      <div class="badge badge-md">987,654</div>
      <div class="badge badge-sm">987,654</div>
      <div class="badge badge-xs">987,654</div>
      <div class="badge badge-primary badge-lg"></div>
      <div class="badge badge-primary badge-md"></div>
      <div class="badge badge-primary badge-sm"></div>
      <div class="badge badge-primary badge-xs"></div>
      <div class="badge badge-info gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        info
      </div>
      <div class="badge badge-success gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        success
      </div>
      <div class="badge badge-warning gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        warning
      </div>
      <div class="badge badge-error gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        error
      </div>
      <h2 class="text-xl">
        Heading
        <span class="badge badge-lg">NEW</span>
      </h2>
      <h3 class="text-lg">
        Heading
        <span class="badge badge-md">NEW</span>
      </h3>
      <h4 class="text-base">
        Heading
        <span class="badge badge-sm">NEW</span>
      </h4>
      <h5 class="text-sm">
        Heading
        <span class="badge badge-xs">NEW</span>
      </h5>
      <button class="btn">
        Inbox
        <div class="badge">+99</div>
      </button>
      <button class="btn">
        Inbox
        <div class="badge badge-secondary">+99</div>
      </button>
      <div class="border-2 shadow m-2">
        <div class="chat chat-start">
          <div class="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
        </div>
        <div class="chat chat-start">
          <div class="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
        </div>
        <div class="chat chat-start">
          <div class="chat-bubble chat-bubble-accent">
            That's never been done in the history of the Jedi. It's insulting!
          </div>
        </div>
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-success">You have been given a great honor.</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-error">It's never happened before.</div>
        </div>
      </div>
      <div>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Total Likes</div>
            <div class="stat-value text-primary">25.6K</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Page Views</div>
            <div class="stat-value text-secondary">2.6M</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="avatar online">
                <div class="w-16 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">Tasks done</div>
            <div class="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>

        <div class="my-4">
          <ul class="timeline">
            <li>
              <div class="timeline-start timeline-box">First Macintosh computer</div>
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <hr class="bg-primary" />
            </li>
            <li>
              <hr class="bg-primary" />
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="timeline-end timeline-box">iMac</div>
              <hr class="bg-primary" />
            </li>
            <li>
              <hr class="bg-primary" />
              <div class="timeline-start timeline-box">iPod</div>
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="timeline-end timeline-box">iPhone</div>
              <hr />
            </li>
            <li>
              <hr />
              <div class="timeline-start timeline-box">Apple Watch</div>
              <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </li>
          </ul>
        </div>
        <div class="my-4">
          <ul class="timeline timeline-vertical">
            <li>
              <div class="timeline-start timeline-box">First Macintosh computer</div>
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <hr class="bg-primary" />
            </li>
            <li>
              <hr class="bg-primary" />
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="timeline-end timeline-box">iMac</div>
              <hr class="bg-primary" />
            </li>
            <li>
              <hr class="bg-primary" />
              <div class="timeline-start timeline-box">iPod</div>
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="timeline-end timeline-box">iPhone</div>
              <hr />
            </li>
            <li>
              <hr />
              <div class="timeline-start timeline-box">Apple Watch</div>
              <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cols-span-4 space-x-2 space-y-2 p-2 m-2">
      <div class="space-y-2 p-2 m-2">
        <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" />
        <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full max-w-xs" />
        <input type="text" placeholder="Type here" class="input input-bordered input-accent w-full max-w-xs" />
        <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" />
        <input type="text" placeholder="Type here" class="input input-bordered input-success w-full max-w-xs" />
        <input type="text" placeholder="Type here" class="input input-bordered input-warning w-full max-w-xs" />
        <input type="text" placeholder="Type here" class="input input-bordered input-error w-full max-w-xs" />
      </div>
      <div class="space-y-2 p-2 m-2">
        <input type="checkbox" class="toggle" checked />
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">On/Off</span>
            <input type="checkbox" class="toggle" checked />
          </label>
        </div>
        <div class="flex flex-col">
          <div class="form-control w-52">
            <label class="cursor-pointer label">
              <span class="label-text">On/Off</span>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </label>
          </div>
          <div class="form-control w-52">
            <label class="cursor-pointer label">
              <span class="label-text">On/Off</span>
              <input type="checkbox" class="toggle toggle-secondary" checked />
            </label>
          </div>
          <div class="form-control w-52">
            <label class="cursor-pointer label">
              <span class="label-text">On/Off</span>
              <input type="checkbox" class="toggle toggle-accent" checked />
            </label>
          </div>
        </div>
        <div>
          <input type="checkbox" class="toggle toggle-success" checked />
          <input type="checkbox" class="toggle toggle-warning" checked />
          <input type="checkbox" class="toggle toggle-info" checked />
          <input type="checkbox" class="toggle toggle-error" checked />
        </div>

        <div>
          <input type="checkbox" class="toggle toggle-xs" checked />
          <input type="checkbox" class="toggle toggle-sm" checked />
          <input type="checkbox" class="toggle toggle-md" checked />
          <input type="checkbox" class="toggle toggle-lg" checked />
        </div>
        <div>
          <input type="checkbox" class="toggle" disabled />
          <input type="checkbox" class="toggle" disabled checked />

          <input type="checkbox" class="toggle" id="my-toggle" />
          <input
            type="checkbox"
            class="toggle [--tglbg:yellow] bg-blue-500 hover:bg-blue-700 border-blue-500"
            checked
          />
        </div>
      </div>
      <div class="m-2 space-y-4">
        <div role="alert" class="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>12 unread messages. Tap to see.</span>
        </div>
        <div role="alert" class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>New software update available.</span>
        </div>
        <div role="alert" class="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
        <div role="alert" class="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: Invalid email address!</span>
        </div>
        <div role="alert" class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Task failed successfully.</span>
        </div>
        <div role="alert" class="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>we use cookies for no reason.</span>
          <div>
            <button class="btn btn-sm">Deny</button>
            <button class="btn btn-sm btn-primary">Accept</button>
          </div>
        </div>
        <div role="alert" class="alert shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 class="font-bold">New message!</h3>
            <div class="text-xs">You have 1 unread message</div>
          </div>
          <button class="btn btn-sm">See</button>
        </div>
      </div>
      <div class="space-y-4 space-x-2">
        <div class="m-2">
          <div class="join">
            <button class="join-item btn">1</button>
            <button class="join-item btn btn-active">2</button>
            <button class="join-item btn">3</button>
            <button class="join-item btn">4</button>
          </div>
        </div>
        <div class="m-2">
          <div class="join m-2">
            <button class="join-item btn btn-xs">1</button>
            <button class="join-item btn btn-xs btn-active">2</button>
            <button class="join-item btn btn-xs">3</button>
            <button class="join-item btn btn-xs">4</button>
          </div>
          <div class="join m-2">
            <button class="join-item btn btn-sm">1</button>
            <button class="join-item btn btn-sm btn-active">2</button>
            <button class="join-item btn btn-sm">3</button>
            <button class="join-item btn btn-sm">4</button>
          </div>
          <div class="join m-2">
            <button class="join-item btn btn-md">1</button>
            <button class="join-item btn btn-md btn-active">2</button>
            <button class="join-item btn btn-md">3</button>
            <button class="join-item btn btn-md">4</button>
          </div>
          <div class="join m-2">
            <button class="join-item btn btn-lg">1</button>
            <button class="join-item btn btn-lg btn-active">2</button>
            <button class="join-item btn btn-lg">3</button>
            <button class="join-item btn btn-lg">4</button>
          </div>
        </div>
        <div class="m-4">
          <div class="join m-2">
            <button class="join-item btn">1</button>
            <button class="join-item btn">2</button>
            <button class="join-item btn btn-disabled">...</button>
            <button class="join-item btn">99</button>
            <button class="join-item btn">100</button>
          </div>
        </div>
        <div class="m-4">
          <div class="join">
            <button class="join-item btn">«</button>
            <button class="join-item btn">Page 22</button>
            <button class="join-item btn">»</button>
          </div>
        </div>
        <div class="m-4">
          <div class="join grid grid-cols-2">
            <button class="join-item btn btn-outline">Previous page</button>
            <button class="join-item btn btn-outline">Next</button>
          </div>
        </div>
        <div class="m-4">
          <div class="join">
            <input class="join-item btn btn-square" type="radio" name="options" aria-label="1" checked />
            <input class="join-item btn btn-square" type="radio" name="options" aria-label="2" />
            <input class="join-item btn btn-square" type="radio" name="options" aria-label="3" />
            <input class="join-item btn btn-square" type="radio" name="options" aria-label="4" />
          </div>
        </div>
      </div>
    </div>
    <div class="cols-span-4 space-x-2 space-y-2 p-2 m-2">
      <div class="space-y-2 margin-4">
        <div role="tablist" class="tabs">
          <a role="tab" class="tab">Tab 1</a>
          <a role="tab" class="tab tab-active">Tab 2</a>
          <a role="tab" class="tab">Tab 3</a>
        </div>
        <div role="tablist" class="tabs tabs-bordered">
          <a role="tab" class="tab">Tab 1</a>
          <a role="tab" class="tab tab-active">Tab 2</a>
          <a role="tab" class="tab">Tab 3</a>
        </div>
        <div role="tablist" class="tabs tabs-lifted">
          <a role="tab" class="tab">Tab 1</a>
          <a role="tab" class="tab tab-active">Tab 2</a>
          <a role="tab" class="tab">Tab 3</a>
        </div>
        <div role="tablist" class="tabs tabs-boxed">
          <a role="tab" class="tab">Tab 1</a>
          <a role="tab" class="tab tab-active">Tab 2</a>
          <a role="tab" class="tab">Tab 3</a>
        </div>
        <!-- xs -->
        <div role="tablist" class="tabs tabs-lifted tabs-xs">
          <a role="tab" class="tab">Tiny</a>
          <a role="tab" class="tab tab-active">Tiny</a>
          <a role="tab" class="tab">Tiny</a>
        </div>
        <!-- sm -->
        <div role="tablist" class="tabs tabs-lifted tabs-sm">
          <a role="tab" class="tab">Small</a>
          <a role="tab" class="tab tab-active">Small</a>
          <a role="tab" class="tab">Small</a>
        </div>
        <!-- md -->
        <div role="tablist" class="tabs tabs-lifted">
          <a role="tab" class="tab">Normal</a>
          <a role="tab" class="tab tab-active">Normal</a>
          <a role="tab" class="tab">Normal</a>
        </div>
        <!-- lg -->
        <div role="tablist" class="tabs tabs-lifted tabs-lg">
          <a role="tab" class="tab">Large</a>
          <a role="tab" class="tab tab-active">Large</a>
          <a role="tab" class="tab">Large</a>
        </div>
        <div role="tablist" class="tabs tabs-bordered">
          <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tab 1" />
          <div role="tabpanel" class="tab-content p-10">Tab content 1</div>

          <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tab 2" checked />
          <div role="tabpanel" class="tab-content p-10">Tab content 2</div>

          <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tab 3" />
          <div role="tabpanel" class="tab-content p-10">Tab content 3</div>
        </div>
        <div role="tablist" class="tabs tabs-lifted">
          <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 1" />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 1</div>

          <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 2" checked />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

          <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 3" />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
        </div>
        <div role="tablist" class="tabs tabs-lifted">
          <a role="tab" class="tab">Tab 1</a>
          <a role="tab" class="tab tab-active [--tab-bg:yellow] [--tab-border-color:orange] text-primary">Tab 2</a>
          <a role="tab" class="tab">Tab 3</a>
        </div>
      </div>

      <div class="space-y-4 my-6">
        <select class="select select-ghost w-full max-w-xs">
          <option disabled selected>Pick the best JS framework</option>
          <option>Svelte</option>
          <option>Vue</option>
          <option>React</option>
        </select>
        <select class="select select-bordered w-full max-w-xs">
          <option disabled selected>Who shot first?</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <select class="select select-ghost w-full max-w-xs">
          <option disabled selected>Pick the best JS framework</option>
          <option>Svelte</option>
          <option>Vue</option>
          <option>React</option>
        </select>
        <select class="select select-ghost w-full max-w-xs">
          <option disabled selected>Pick the best JS framework</option>
          <option>Svelte</option>
          <option>Vue</option>
          <option>React</option>
        </select>
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>What is the best TV show?</option>
          <option>Game of Thrones</option>
          <option>Lost</option>
          <option>Breaking Bad</option>
          <option>Walking Dead</option>
        </select>
        <select class="select select-secondary w-full max-w-xs">
          <option disabled selected>Pick your favorite language</option>
          <option>Java</option>
          <option>Go</option>
          <option>C</option>
          <option>C#</option>
          <option>C++</option>
          <option>Rust</option>
          <option>JavaScript</option>
          <option>Python</option>
        </select>
        <select class="select select-accent w-full max-w-xs">
          <option disabled selected>Dark mode or light mode?</option>
          <option>Auto</option>
          <option>Dark mode</option>
          <option>Light mode</option>
        </select>
        <select class="select select-info w-full max-w-xs">
          <option disabled selected>Select language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Italian</option>
        </select>

        <select class="select select-warning w-full max-w-xs">
          <option disabled selected>Pick a pizza</option>
          <option>Cheese</option>
          <option>Veggie</option>
          <option>Pepperoni</option>
          <option>Margherita</option>
          <option>Hawaiian</option>
        </select>
        <select class="select select-error w-full max-w-xs">
          <option disabled selected>What is the best headless CMS</option>
          <option>Strapi</option>
          <option>Ghost</option>
          <option>Netlify CMS</option>
          <option>Sanity</option>
        </select>
        <!-- lg -->
        <select class="select select-bordered select-lg w-full max-w-xs">
          <option disabled selected>Large</option>
          <option>Large Apple</option>
          <option>Large Orange</option>
          <option>Large Tomato</option>
        </select>
        <!-- md -->
        <select class="select select-bordered w-full max-w-xs">
          <option disabled selected>Normal</option>
          <option>Normal Apple</option>
          <option>Normal Orange</option>
          <option>Normal Tomato</option>
        </select>
        <!-- sm -->
        <select class="select select-bordered select-sm w-full max-w-xs">
          <option disabled selected>Small</option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>
        <!-- xs -->
        <select class="select select-bordered select-xs w-full max-w-xs">
          <option disabled selected>Tiny</option>
          <option>Tiny Apple</option>
          <option>Tiny Orange</option>
          <option>Tiny Tomato</option>
        </select>
      </div>
      <div class="flex flex-col space-x-12 space-y-12 m-12 h-1/2 w-1/4">
        <div class="tooltip" data-tip="hello">
          <button class="btn">Hover me</button>
        </div>
        <div class="tooltip tooltip-open" data-tip="hello">
          <button class="btn">Force open</button>
        </div>
        <div class="">
          <div class="tooltip tooltip-open tooltip-top" data-tip="hello">
            <button class="btn">Top</button>
          </div>
          <div class="tooltip tooltip-open tooltip-bottom" data-tip="hello">
            <button class="btn">Bottom</button>
          </div>
          <div class="tooltip tooltip-open tooltip-left" data-tip="hello">
            <button class="btn">Left</button>
          </div>
          <div class="tooltip tooltip-open tooltip-right" data-tip="hello">
            <button class="btn">Right</button>
          </div>
        </div>
        <div class="tooltip tooltip-open tooltip-primary" data-tip="primary">
          <button class="btn btn-primary">primary</button>
        </div>
        <div class="tooltip tooltip-open tooltip-secondary" data-tip="secondary">
          <button class="btn btn-secondary">secondary</button>
        </div>
        <div class="tooltip tooltip-open tooltip-accent" data-tip="accent">
          <button class="btn btn-accent">accent</button>
        </div>
        <div class="tooltip tooltip-open tooltip-info" data-tip="info">
          <button class="btn btn-info">info</button>
        </div>
        <div class="tooltip tooltip-open tooltip-success" data-tip="success">
          <button class="btn btn-success">success</button>
        </div>
        <div class="tooltip tooltip-open tooltip-warning" data-tip="warning">
          <button class="btn btn-warning">warning</button>
        </div>
        <div class="tooltip tooltip-open tooltip-error" data-tip="error">
          <button class="btn btn-error">error</button>
        </div>
        <div class="lg:tooltip" data-tip="hello">
          <button class="btn">Hover me</button>
        </div>
      </div>

      <div class="">
        <div class="indicator">
          <span class="indicator-item badge badge-secondary"></span>
          <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
          <div class="indicator">
            <span class="indicator-item badge badge-primary">new</span>
            <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
          </div>
          <div class="indicator">
            <span class="indicator-item badge badge-secondary">99+</span>
            <button class="btn">inbox</button>
          </div>
          <div class="tabs tabs-lifted">
            <a class="tab">Messages</a>
            <a class="indicator tab tab-active">
              Notifications
              <span class="indicator-item badge">8</span>
            </a>
            <a class="tab">Requests</a>
          </div>
          <div class="avatar indicator">
            <span class="indicator-item badge badge-secondary">typing…</span>
            <div class="w-20 h-20 rounded-lg">
              <img
                alt="Tailwind CSS examples"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="indicator">
            <span class="indicator-item badge">Required</span>
            <input type="text" placeholder="Your email address" class="input input-bordered" />
          </div>
          <div class="indicator">
            <div class="indicator-item indicator-bottom">
              <button class="btn btn-primary">Apply</button>
            </div>
            <div class="card border">
              <div class="card-body">
                <h2 class="card-title">Job Title</h2>
                <p>Rerum reiciendis beatae tenetur excepturi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="flex-col grid grid-cols-4 gap-4">
    <div class="indicator">
      <span class="indicator-item indicator-center badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item indicator-middle indicator-start badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item indicator-middle indicator-center badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item indicator-middle badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item indicator-bottom indicator-start badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator">
      <span class="indicator-item indicator-bottom badge badge-secondary"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
    </div>
    <div class="indicator grid">
      <span class="indicator-item indicator-top indicator-start badge badge-secondary">top+start</span>
      <span class="indicator-item indicator-top indicator-center badge badge-secondary">top+center</span>
      <span class="indicator-item indicator-top indicator-end badge badge-secondary">top+end</span>
      <span class="indicator-item indicator-middle indicator-start badge badge-secondary">middle+start</span>
      <span class="indicator-item indicator-middle indicator-center badge badge-secondary">middle+center</span>
      <span class="indicator-item indicator-middle indicator-end badge badge-secondary">middle+end</span>
      <span class="indicator-item indicator-bottom indicator-start badge badge-secondary">bottom+start</span>
      <span class="indicator-item indicator-bottom indicator-center badge badge-secondary">bottom+center</span>
      <span class="indicator-item indicator-bottom indicator-end badge badge-secondary">bottom+end</span>
      <div class="grid w-60 h-32 bg-base-300 place-items-center">content</div>
    </div>
  </div> -->
  <!-- <div>
    <ul class="timeline">
      <li>
        <div class="timeline-start">1984</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">1998</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2001</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2007</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2015</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline">
      <li>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iMac</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPod</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPhone</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
    <ul class="timeline">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPod</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
    <ul class="timeline">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start timeline-box">iPod</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>

    <ul class="timeline">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical">
      <li>
        <div class="timeline-start">1984</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">1998</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2001</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2007</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2015</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical">
      <li>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iMac</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPod</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPhone</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPod</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start timeline-box">iPod</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical">
      <li>
        <div class="timeline-start timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline timeline-vertical lg:timeline-horizontal">
      <li>
        <div class="timeline-start">1984</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">First Macintosh computer</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">1998</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iMac</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2001</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPod</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2007</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">iPhone</div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-start">2015</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">Apple Watch</div>
      </li>
    </ul>
    <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      <li>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-start md:text-end mb-10">
          <time class="font-mono italic">1984</time>
          <div class="text-lg font-black">First Macintosh computer</div>
          The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal computer.
          It played a pivotal role in establishing desktop publishing as a general office function. The motherboard, a 9
          in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated carrying handle; it
          came with a keyboard and single-button mouse.
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end mb-10">
          <time class="font-mono italic">1998</time>
          <div class="text-lg font-black">iMac</div>
          iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the primary
          part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved through seven
          distinct forms
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-start md:text-end mb-10">
          <time class="font-mono italic">2001</time>
          <div class="text-lg font-black">iPod</div>
          The iPod is a discontinued series of portable media players and multi-purpose mobile devices designed and
          marketed by Apple Inc. The first version was released on October 23, 2001, about 8+1⁄2 months after the
          Macintosh version of iTunes was released. Apple sold an estimated 450 million iPod products as of 2022. Apple
          discontinued the iPod product line on May 10, 2022. At over 20 years, the iPod brand is the oldest to be
          discontinued by Apple
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end mb-10">
          <time class="font-mono italic">2007</time>
          <div class="text-lg font-black">iPhone</div>
          iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system. The
          first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has
          annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2 billion iPhones had
          been sold. As of 2022, the iPhone accounts for 15.6% of global smartphone market share
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-start md:text-end mb-10">
          <time class="font-mono italic">2015</time>
          <div class="text-lg font-black">Apple Watch</div>
          The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness tracking,
          health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products
          and services
        </div>
      </li>
    </ul>
  </div> -->
</template>
