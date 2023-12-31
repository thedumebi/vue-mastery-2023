export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-2xl`

    if (binding.arg === 'full') {
      iconClass = binding.value
    }

    if (binding.modifiers.right) {
      iconClass += ' float-right'
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-500'
    } else {
      iconClass += ' text-green-400'
    }

    el.innerHTML += `<i class="${iconClass}"></i>`
    // el.innerHTML += `<i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>`
  }
}
