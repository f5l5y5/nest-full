<template>
	<div class="wraps">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="账号登录" name="first">
				<el-form
					:label-position="labelPosition"
					label-width="100px"
					:model="formLabelAlign"
					style="max-width: 460px"
				>
					<el-form-item label="账号">
						<el-input v-model="formLabelAlign.name" />
					</el-form-item>
					<el-form-item label="密码">
						<el-input type="password" v-model="formLabelAlign.password" />
					</el-form-item>
					<el-form-item label="验证码">
						<div style="display: flex">
							<el-input v-model="formLabelAlign.code" />
							<img @click="resetCode" :src="codeUrl" alt="" />
						</div>
					</el-form-item>
					<el-form-item>
						<el-button @click="loginSubmit">登录</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="注册账户" name="second">
				<el-form
					:label-position="labelPosition"
					label-width="100px"
					:model="loginForm"
					style="max-width: 460px"
					class="register"
				>
				<el-form-item label="用户名">
						<el-input v-model="loginForm.name" />
					</el-form-item>
					<el-form-item label="手机号">
						<el-input v-model="loginForm.phone" />
					</el-form-item>
					<el-form-item label="密码">
						<el-input type="password" v-model="loginForm.password" />
					</el-form-item>
					<el-form-item>
						<el-button @click="registerSubmit">注册</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts">
import { addUser, login, baseUrl } from '@/api/index'
import { reactive, ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: any) => {
	if (tab.paneName === 'first') {
		console.log('打印***tab.paneName', tab.paneName)
	} else {
	}
}
/* ============================ 登录 ================================ */
const codeUrl = ref<string>(baseUrl + '/login/getDynamicCode')
// 默认写成图片地址，每次点击获 需要重新更新视图
const resetCode = () => (codeUrl.value = codeUrl.value + '?' + Math.random())

const labelPosition = ref<string>('right')

const formLabelAlign = reactive<{
	name: string
	password: string
	code: string
}>({
	name: '',
	password: '',
	code: ''
})

const loginSubmit = async () => {
	await login(formLabelAlign)
}

/* ============================ 注册 ================================ */

const loginForm = reactive<{
	phone: string
	password: string
	name: string
}>({
	phone: '',
	password: '',
	name: ''
})

const registerSubmit = async () => {
	await addUser(loginForm)
}
</script>

<style>
* {
	padding: 0;
	margin: 0;
}

.wraps {
	display: flex;
	justify-content: center;
	align-items: center;
	height: inherit;
}

.register .el-form-item {
	width: 400px;
}

html,
body,
#app {
	height: 100%;
	background-color: #fff;
}
</style>
