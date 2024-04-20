// https://vue3-toastify.js-bridge.com/usage/positioning-toast.html

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface ToastOptions {
  val: string
  type: string
  autoClose: boolean
  length: number
  position: string
}

export const toastEm = (options: Partial<ToastOptions> = {}) => {
  const { length = 2500, autoClose = true, val = 'A message', type = 'info', position = 'bRight' } = options

  let t = toast.TYPE.DEFAULT
  if (type === 'danger') {
    t = toast.TYPE.ERROR
  } else if (type === 'info') {
    t = toast.TYPE.INFO
  } else {
    t = toast.TYPE.SUCCESS
  }
  let pos = toast.POSITION.BOTTOM_RIGHT
  if (position == 'bLeft') {
    pos = toast.POSITION.BOTTOM_LEFT
  } else if (position == 'tLeft') {
    pos = toast.POSITION.TOP_LEFT
  } else if (position == 'tRight') {
    pos = toast.POSITION.TOP_RIGHT
  } else if (position == 'bCenter') {
    pos = toast.POSITION.BOTTOM_CENTER
  }

  toast(val, {
    type: t,
    position: pos,
    autoClose: autoClose != true ? false : length,
  })
}
