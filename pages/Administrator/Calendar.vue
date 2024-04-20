<script setup>
import { faker } from '@faker-js/faker/locale/af_ZA'

definePageMeta({
  layout: 't-main-layout',
  layoutTransition: true,
})
</script>

<script>
export default {
  methods: {
    removeEvent(attr) {
      this.attributes = this.attributes.filter((a) => a.key !== attr.key)
    },
    addEvent(day) {
      const month = new Date().getMonth()
      const year = new Date().getFullYear()
      const date = new Date(year, month, day.id.split('-')[2])
      this.attributes.push({
        dates: date,
        key: faker.database.mongodbObjectId(),
        customData: {
          title: 'Lunch with mom. ' + faker.company.catchPhrase(),
          class: 'bg-accent text-white',
        },
      })
    },
  },
  data() {
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const attributes = [
      {
        key: 6,
        customData: {
          title: 'Cookout with friends.',
          class: 'bg-primary text-white',
        },
        dates: { months: 5, ordinalWeekdays: { 2: 1 } },
      },
    ]
    let idx = 30
    let colors = [
      'bg-primary',
      'bg-secondary',
      'bg-accent',
      'bg-neutral',
      'bg-success',
      'bg-warning',
      'bg-info',
      'bg-error',
    ]
    while (idx > 0) {
      attributes.push({
        dates: new Date(year, month, faker.number.int({ min: 1, max: 28 })),
        key: faker.database.mongodbObjectId(),
        customData: {
          title: faker.company.catchPhrase(),
          class: faker.helpers.arrayElement(colors) + ' text-white',
        },
      })
      idx--
    }
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes,
    }
  },
}
</script>

<template>
  <div class="text-center section w-100 flex justify-end">
    <VCalendar
      class="custom-calendar max-w-full max-h-full bg-base-100"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div
          class="flex flex-col h-full overflow-hidden"
          @click="
            () => {
              addEvent(day)
            }
          "
        >
          <span class="day-label text-sm primary-content dark:text-white">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
              @click="
                (e) => {
                  removeEvent(attr)
                  e.stopPropagation()
                }
              "
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </VCalendar>
    <!-- <VideoContainer /> -->
  </div>
</template>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

:deep() .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: oklch(var(--b3));

  --weekday-border: 1px solid #eaeaea;

  border-radius: 0;
  width: 100%;

  & .vc-header {
    background-color: oklch(var(--b1));
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: oklch(var(--b1));
    &.weekday-1,
    &.weekday-7 {
      background-color: oklch(var(--b2));
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}

:deep() {
  .vc-header .vc-title {
    color: oklch(var(--p));
  }
  .vc-pane-layout {
    background-color: oklch(var(--b1));
  }

  .vc-weeks {
    top: 10px !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;

    & .vc-week {
      flex: 1;
      & .vc-day {
        height: 100%;
      }
    }
  }
  .vc-pane-container {
    z-index: 0;
    background-color: oklch(var(--b1));
    height: 100vh;
    & .vc-pane-layout {
      height: 100vh;
    }
    & .vc-title-wrapper {
      z-index: 1;
    }
  }
}
</style>
