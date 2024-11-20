<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useFormResultStore } from '@/stores/formResult'
import type { FormInstance, FormRules } from 'element-plus'
import { vMaska } from 'maska/vue'

interface FormA {
  name: string
  email?: string
  inn: string
  phone: string
}

interface FormB {
  name: string
  surname: string
  patronymic: string
  birthDate: string
  login: string
  email: string
}

const store = useFormResultStore()

// Форма A
const formARef = ref<FormInstance>()
const formA = reactive<FormA>({
  name: '',
  email: '',
  inn: '',
  phone: '',
})
const rulesA: FormRules<FormA> = {
  name: [{ required: true, message: 'Имя обязательно', trigger: 'blur' }],
  email: [
    {
      type: 'email',
      message: 'Введите корректный email',
      trigger: ['blur'],
    },
  ],
  inn: [
    { required: true, message: 'ИНН обязателен', trigger: 'blur' },
    {
      message: 'Введите корректный ИНН',
      min: 10,
      max: 12,
    },
  ],
  phone: [
    { required: true, message: 'Телефон обязателен', trigger: 'blur' },
    {
      pattern: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      message: 'Введите телефон в формате +7 (XXX) XXX-XX-XX',
      trigger: 'blur',
    },
  ],
}

// Форма B
const formBRef = ref<FormInstance>()
const formB = reactive<FormB>({
  name: '',
  surname: '',
  patronymic: '',
  birthDate: '',
  login: '',
  email: '',
})
const rulesB: FormRules<FormB> = {
  name: [{ required: true, message: 'Имя обязательно', trigger: 'blur' }],
  surname: [{ required: true, message: 'Фамилия обязательна', trigger: 'blur' }],
  email: [
    {
      required: true,
      message: 'Email обязателен',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Введите корректный email',
      trigger: ['blur'],
    },
  ],
}

// Отправка формы
const submitForm = async (formEl: FormInstance, formData: object, endpoint: string) => {
  if (!formEl) return

  formEl.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) throw new Error('Ошибка отправки данных')
        const data = await response.json()
        store.addResult({ id: data.id, message: data.message })
        alert(`Успешно отправлено: ${data.message}`)
      } catch (error: unknown) {
        // @ts-expect-error type error?
        alert('Ошибка отправки: ' + error.message)
      }
    }
  })
}
</script>

<template>
  <div class="page">
    <div class="form">
      <h2>Форма A</h2>
      <el-form ref="formARef" :model="formA" :rules="rulesA" label-width="120px">
        <el-form-item label="Имя" prop="name">
          <el-input v-model="formA.name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="formA.email" />
        </el-form-item>
        <el-form-item label="ИНН" prop="inn">
          <el-input v-model="formA.inn" />
        </el-form-item>
        <el-form-item label="Телефон" prop="phone">
          <el-input
            v-maska="'+7 (###) ###-##-##'"
            v-model="formA.phone"
            placeholder="+7 (XXX) XXX-XX-XX"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formARef!, formA, '/form/a')"
            >Отправить</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="form">
      <h2>Форма B</h2>
      <el-form ref="formBRef" :model="formB" :rules="rulesB" label-width="120px">
        <el-form-item label="Имя" prop="name">
          <el-input v-model="formB.name" />
        </el-form-item>
        <el-form-item label="Фамилия" prop="surname">
          <el-input v-model="formB.surname" />
        </el-form-item>
        <el-form-item label="Отчество" prop="patronymic">
          <el-input v-model="formB.patronymic" />
        </el-form-item>
        <el-form-item label="Дата рождения" prop="birthDate">
          <el-date-picker v-model="formB.birthDate" type="date" placeholder="Выберите дату" />
        </el-form-item>
        <el-form-item label="Логин" prop="login">
          <el-input v-model="formB.login" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="formB.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formBRef!, formB, '/form/b')"
            >Отправить</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 20px;
}
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 600px;
}
</style>
