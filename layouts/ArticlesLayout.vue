<script setup>
definePageMeta({
  layoutTransition: true,
})
const { isOpen, toggleOpen } = useToggleOpen()

const handleToggle = () => {
  if (window.innerWidth > 768) return
  toggleOpen()
}
useHead({
  script: [
    {
      type: 'text/javascript',
      innerHTML: 'console.log("Entity scripts loading...")',
      tagPosition: 'head',
    },
  ],
})
</script>
<template>
  <div class="flex flex-col justify-between bg-base-100">
    <div class="min-h-screen">
      <The.Navbar />
      <div class="flex flex-row">
        <div
          class="hidden md:flex flex-col h-full max-h-screen overflow-y-auto border-r-2 border-neutral overflow-x-scroll max-w-64 whitespace-nowrap"
        >
          <MenuTableOfContents @toggled="handleToggle" />
        </div>
        <div class="flex flex-grow overflow-y-auto max-h-screen no-scrollbar md:mr-4 lg:mr-0 pt-8">
          <slot class="w-full" />
          <div class="main-nav visible lg:block md:hidden rounded border z-10 shadow hidden">
            <MenuBurger :isOpen="isOpen" @toggled="toggleOpen" />
          </div>
          <div class="hidden md:block">
            <MenuSidebar :isOpen="isOpen" @toggled="toggleOpen">
              <MenuTableOfContents @toggled="handleToggle" />
            </MenuSidebar>
          </div>
        </div>
        <div class="hidden md:flex flex-col h-full max-h-screen overflow-y-auto border-gray lg:pr-8">
          <ScrollSpy />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-nav {
  right: 10px;
  bottom: 10px;
  display: flex;
  position: fixed;
  padding: 0.5rem 0.8rem;
  justify-content: space-between;
  background-color: rgba(19, 15, 64);
}
</style>
