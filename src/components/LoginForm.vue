<!-- <script lang="ts">
import { defineComponent, ref } from 'vue'
import InformationHint from '@/components/hints/InformationHint.vue'
import FormInput from '@/components/form/FormInput.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import Spinner from '@/components/Spinner.vue'
import { useMessagesStore } from '@/store/messages'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  name: 'LoginForm',
  components: {
    FormInput,
    SubmitButton,
    Spinner,
    InformationHint,
  },
  props: {
    complete: Function,
  },
  setup(props) {
    const route = useRoute()
    const userStore = useAuthStore()
    const messagesStore = useMessagesStore()
    const router = useRouter()

    const loading = ref(false)
    const email = ref(null)
    const username = ref(null)
    const password = ref(null)
    const statusMessage = ref('')
    const formWiggle = ref(false)

    const login = async (): Promise<void> => {
      loading.value = true

      const user = await userStore.login(email.value, password.value)
      if (user && user.success) {
        messagesStore.createMessage({
          type: 'info',
          title: 'Sign in successful',
          message: `Welcome, ${username.value}`,
        })
        if (props.complete && typeof props.complete === 'function')
          props.complete()

        else
          router.push((route.query.ref as string) || '/')
      }
      else {
        loading.value = false
        wiggleLoginForm()
        messagesStore.createMessage({
          type: 'error',
          title: 'Sign in failed',
          message: user ? user.error : '',
        })
      }
    }

    const wiggleLoginForm = (): void => {
      formWiggle.value = true
      setTimeout(() => {
        formWiggle.value = false
      }, 600)
    }

    return {
      loading,
      email,
      password,
      statusMessage,
      formWiggle,
      login,
    }
  },
})
</script>

<template>
  <div class="login-form" :class="{ loading, wiggle: formWiggle }">
    <h2 class="login-title">
      Sign in
    </h2>
    <span class="status-message-display message-display">{{ statusMessage }}</span>
    <InformationHint class="hint">
      Usernames are case sensitive
    </InformationHint>
    <Spinner />
    <form id="login" method="post" @submit.prevent="login">
      <FormInput id="email" v-model="email" label="email" type="email" />
      <FormInput id="password" v-model="password" label="password" type="password" />
      <SubmitButton label="Sign in" />
    </form>
  </div>
</template>

<style lang="scss">
.login-form {
  margin: auto;
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  box-shadow: $medium-shadow;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 901;

  @media screen and (max-width: $mobile-width) {
    height: auto;
    box-shadow: none;
  }

  &.wiggle {
    animation: wiggle 600ms;
  }

  .login-title {
    margin: 20px 0 0 0;
    font-size: 2rem;
    color: var(--theme-color);
    font-family: $default-font;
  }

  .message-display {
    height: 20px;
    line-height: 20px;
  }

  .hint {
    width: calc(100% - 80px);
    margin: 15px 0 0 0;
  }

  &.loading {

    .hint,
    #login {
      opacity: 0;
      pointer-events: none;
    }

    .spinner {
      opacity: 1;
    }
  }

  .spinner {
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 300ms $intro-easing;
  }

  #login {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    padding: 10px;
    box-sizing: border-box;
    transition: opacity 300ms $intro-easing;
  }
}

@keyframes wiggle {

  20%,
  60% {
    transform: translateX(-10px);
  }

  40%,
  80% {
    transform: translate(10px);
  }
}
</style> -->
<script lang="ts">
import AccountIcon from 'vue-material-design-icons/AccountOutline.vue'
import KeyIcon from 'vue-material-design-icons/KeyOutline.vue'
import MailIcon from 'vue-material-design-icons/At.vue'
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'FormInput',
  components: {
    AccountIcon,
    KeyIcon,
    MailIcon,
  },
  props: {
    type: { type: String, required: false, default: () => undefined },
    value: null,
    label: String,
    id: String,
  },
  setup(props) {
    const autocompleteTags = reactive({
      email: 'email',
      username: 'username',
      password: 'current-password',
      all: 'on',
    })

    const hasText = computed((): boolean => {
      return props.value && props.value.length > 0
    })
    const autocompleteTag = computed((): string => {
      const tagId = Object.keys(autocompleteTags).find(type => type === props.type)
      const tag = tagId !== undefined ? tagId : 'all'

      return autocompleteTags[tag]
    })

    return {
      hasText,
      autocompleteTag,
    }
  },
})
</script>

<template>
  <div class="form-input">
    <input
      :id="id" class="input" :class="{ 'focus-content': hasText }" :autocomplete="autocompleteTag" :type="type"
      :name="autocompleteTag" required :value="value" @input="$emit('input', $event.target.value)"
    >
    <AccountIcon v-if="type === 'username'" />
    <KeyIcon v-if="type === 'password'" />
    <MailIcon v-if="type === 'email'" />
    <label :for="id" class="input-label">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.form-input {
  position: relative;
  $input-line-height: 50px;

  .material-design-icon {
    position: absolute;
    right: 40px;
    top: 30px;
    color: var(--title-color);
  }

  .input:not(:valid) + .material-design-icon {
    color: var(--error-color-red);
  }

  .input {
    margin: 15px 20px;
    padding: 12px 12px;
    line-height: 30px;
    border-radius: 4px;
    width: calc(100% - 40px);
    height: $input-line-height;
    font-size: 1rem;
    color: var(--title-color);
    box-sizing: border-box;
    font-family: $default-font;
    background-color: transparent;
    border: 2px solid var(--bgcolor-alt-light);
    transition: border 300ms $intro-easing;

    &:focus {
      outline: none;
      border-color: var(--theme-color);
    }

    &:focus,
    &.focus-content {
      padding: 20px 12px 4px 12px;
    }

    &:not(:valid) {
      box-shadow: none;
      // border-color: var(--error-color-red)
    }
  }

  .input-label {
    position: absolute;
    left: 34px;
    top: 15px;
    height: $input-line-height;
    line-height: $input-line-height;
    text-align: center;
    margin: auto;
    pointer-events: none;
    transition: transform 300ms $intro-easing, color 300ms $intro-easing;
    transform-origin: left top;
    color: var(--subtitle-color-light);
  }

  .focus-content ~ .input-label,
  .input:focus ~ .input-label {
    transform: scale(0.8) translateY(-10px);
  }

  .input:focus ~ .input-label {
    color: var(--theme-color);
  }
}
</style>
