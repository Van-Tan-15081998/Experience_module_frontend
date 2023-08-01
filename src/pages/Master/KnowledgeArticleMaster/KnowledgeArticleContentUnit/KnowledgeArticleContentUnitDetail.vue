<template>
	<div>
		<core-page-template
			v-if="isActionModeNew"
			page-title="Tạo đơn vị"
			:is-loading-page="isPageLoadingData"
		>

			<template #centerSide>

				<core-form
				>

					<template #formContent>

						<div
							v-if="isShowStatuses"
						>
							<core-notification
								v-for="(status, index) in getStatusesComputed"
								:key="index"
								:is-success="status['type'].includes('info')"
								:message="status['message']"
							>

							</core-notification>
						</div>

						<core-form-input
							label="Tiêu đề"
							:error="getInputErrorByKey('title')"
						>
							<template #input-side>
								<input
									v-model="pageData.title"
									type="text"
									placeholder="Nhập text"
								>
							</template>
						</core-form-input>

						<core-form-text-area
							label="Nội dung"
							:error="getInputErrorByKey('content')"
							@onChangeTextStructure="(textStructureStyle) => onChangeTextStructure(textStructureStyle)"
							@onAddImageOnline="(imageSourceOnline) => onAddImageOnline(imageSourceOnline)"
						>
							<template #input-side>
								<textarea
									v-model="pageData.unitContent"
									rows="15"
									@select="onChooseTextStructure"
									@click="getCursorPosition"
								></textarea>
							</template>
						</core-form-text-area>

						<button
							@click="isEnableCKEditor = !isEnableCKEditor"
							class="core-app-style__button full-width-size blue-harmony-color icon-effect-zoom-in"
						>
							<i v-if="!isEnableCKEditor" class="bi bi-aspect-ratio margin-right-5"></i>
							<i v-else class="bi bi-aspect-ratio-fill margin-right-5"></i>
							CKEditor
						</button>

						<div v-if="isEnableCKEditor">
							<ckeditor
								:editor="editor" v-model="CKEditorContent" :config="editorConfig">

							</ckeditor>
						</div>

						<div
							class="image-wrapper"
							v-for="(item, index ) in pageData.imageList" :key="index"
						>
							<core-form-input
								label="Chọn File"
							>
								<template #input-side>
									<input
										@change="onImageChange($event, index)"
										type="file"
									>
								</template>
							</core-form-input>

							<div
								v-if="pageData.imageList[index]"
								class="show-image-wrapper">
								<div class="core-app-style__container default-size">
									<img :src="pageData.imageList[index]" class="core-img-responsive"/>
								</div>

								<button
									@click="onDeleteImage(index)"
									class="core-app-style__button rounded red-harmony-color icon-effect-zoom-in"
								>
									<i class="bi bi-dash-circle"></i>
								</button>
							</div>

						</div>

						<button
							@click="onAddImage"
							class="core-app-style__button green-harmony-color icon-effect-zoom-in">
							<i class="bi bi-plus-square-dotted margin-right-5"></i>
							Thêm Ảnh
						</button>

					</template>

					<template #formFooter>
						<button
							@click="save"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
						>Lưu</button>
					</template>

				</core-form>

			</template>

		</core-page-template>

		<core-page-template
			v-if="isActionModeEdit"
			page-title="Cập nhật đơn vị"
			:is-loading-page="isPageLoadingData"
		>

			<template #centerSide>

				<core-form
				>

					<template #formContent>

						<div
							v-if="isShowStatuses"
						>
							<core-notification
								v-for="(status, index) in getStatusesComputed"
								:key="index"
								:is-success="status['type'].includes('info')"
								:message="status['message']"
							>

							</core-notification>
						</div>

						<core-form-input
							label="Tiêu đề"
							:error="getInputErrorByKey('title')"
						>
							<template #input-side>
								<input
									v-model="pageData.title"
									type="text"
									placeholder="Nhập text"
								>
							</template>
						</core-form-input>

						<core-form-text-area
							label="Nội dung"
							:error="getInputErrorByKey('content')"
							@onChangeTextStructure="(textStructureStyle) => onChangeTextStructure(textStructureStyle)"
							@onAddImageOnline="(imageSourceOnline) => onAddImageOnline(imageSourceOnline)"
						>
							<template #input-side>
								<textarea
									v-model="pageData.unitContent"
									rows="15"
									@select="onChooseTextStructure"
									@click="getCursorPosition"
								></textarea>
							</template>
						</core-form-text-area>

						<button
							@click="isEnableCKEditor = !isEnableCKEditor"
							class="core-app-style__button full-width-size blue-harmony-color icon-effect-zoom-in"
						>
							<i v-if="!isEnableCKEditor" class="bi bi-aspect-ratio margin-right-5"></i>
							<i v-else class="bi bi-aspect-ratio-fill margin-right-5"></i>
							CKEditor
						</button>

						<div v-if="isEnableCKEditor">
							<ckeditor
								:editor="editor" v-model="CKEditorContent" :config="editorConfig">

							</ckeditor>
						</div>


						<div
							class="image-wrapper"
							v-for="(item, index ) in pageData.imageList" :key="index"
						>
							<core-form-input
								label="Chọn File"
							>
								<template #input-side>
									<input
										@change="onImageChange($event, index)"
										type="file"
									>
								</template>
							</core-form-input>

							<div
								v-if="pageData.imageList[index]"
								class="show-image-wrapper">
								<div class="core-app-style__container default-size">
									<img :src="pageData.imageList[index]" class="core-img-responsive"/>
								</div>

								<button
									@click="onDeleteImage(index)"
									class="core-app-style__button rounded red-harmony-color icon-effect-zoom-in"
								>
									<i class="bi bi-dash-circle"></i>
								</button>
							</div>

						</div>

						<button
							@click="onAddImage"
							class="core-app-style__button green-harmony-color icon-effect-zoom-in">
							<i class="bi bi-plus-square-dotted margin-right-5"></i>
							Thêm Ảnh
						</button>

					</template>

					<template #formFooter>
						<button
							@click="save"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
						>Lưu</button>
					</template>

				</core-form>

			</template>

		</core-page-template>

		<core-page-template
			v-if="isActionModeView"
			:page-title="'Chi tiết Unit: ' + pageData.title"
			:is-loading-page="isPageLoadingData"
		>

			<template #centerSide>

				<div
					v-if="isShowStatuses"
				>
					<core-notification
						v-for="(status, index) in getStatusesComputed"
						:key="index"
						:is-success="status['type'].includes('info')"
						:message="status['message']"
					>

					</core-notification>
				</div>

				<core-transition-content>
					<template #transition-content-side>
						<core-content
							v-if="pageData.title"
							:is-label-master="true"
							label="Tên bài viết"
						>
							<template #content-side>
								{{pageData.title}}
							</template>

						</core-content>
					</template>
				</core-transition-content>

				<core-transition-content>
					<template #transition-content-side>
						<core-content
							v-if="pageData.unitContent"
							label="Nội dung Unit"
						>
							<template #content-side>
								<div class="show_content_html_format" v-html="pageData.unitContent"></div>
							</template>
						</core-content>
					</template>
				</core-transition-content>

			</template>

		</core-page-template>
	</div>
</template>

<script>

import CoreBasePage from "@/core/components/base/CoreBasePage.vue";
import KnowledgeArticleContentUnitApi
	from "@/scripts/Master/KnowledgeArticleMaster/KnowledgeArticleContentUnit/KnowledgeArticleContentUnitApi";

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
	name: 'KnowledgeArticleContentUnitDetail',
	extends: CoreBasePage,
	inject: ['apiService'],
	data() {
		return {
			context: this,
			dataService: KnowledgeArticleContentUnitApi,

			idString: 'knowledgeArticleContentUnitId',

			isEnableCKEditor: false,
			CKEditorContent: '',

			textStructureForChange: '',
			textStructureForChangePositionStart: null,
			cursorPosition: null,

			pageData: {
				knowledgeArticleId: null,

				title: null,
				unitContent: null,
				imageList: [],

				knowledgeArticleContentUnitId: null // For Edit Page
			},

			selectionItemsPageData: {

			},

			editor: ClassicEditor,
			editorConfig: {
				// The configuration of the editor.

				// toolbar: {
				// 	items: [
				// 		'bold',
				// 		'italic',
				// 		'link',
				// 		'undo',
				// 		'redo',
				// 		'table'
				// 	]
				// },

				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'|',
						'bulletedList',
						'numberedList',
						'|',
						'insertTable',
						'|',
						'undo',
						'redo'
					]
				},
				table: {
					contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
				},
				language: 'en'
			}
		}
	},

	methods: {
		onDeleteImage(index) {
			if (this.pageData.imageList[index]) {
				this.pageData.imageList.splice(index, 1);
			}
		},
		onAddImage() {
			this.pageData.imageList.push(null);
		},
		onImageChange(e, index) {
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0], index);
		},

		createImage(file, index) {
			let reader = new FileReader();

			reader.onload = (e) => {
				this.pageData.imageList[index] = e.target.result;
			};
			reader.readAsDataURL(file);
		},

		onChooseTextStructure(event) {
			const inputElement = event.target;
			let selectedText = this.pageData.unitContent.substring(inputElement.selectionStart, inputElement.selectionEnd);

			this.textStructureForChange = selectedText;
			this.textStructureForChangePositionStart = inputElement.selectionStart;
			console.log(this.textStructureForChange,this.textStructureForChangePositionStart);
		},

		onChangeTextStructure(textStructureStyle) {
			if(this.pageData.unitContent && this.pageData.unitContent !== '' && this.textStructureForChange !== '' && this.textStructureForChangePositionStart !== null) {
				let replacement = '<span class="' + textStructureStyle + '">' + this.textStructureForChange + '</span>';

				// Change one time at detail position
				this.pageData.unitContent = this.pageData.unitContent.slice(0, this.textStructureForChangePositionStart) +
																			replacement + this.pageData.unitContent.slice(this.textStructureForChangePositionStart + this.textStructureForChange.length);
				console.log(this.pageData.unitContent);
				// Change all match
				// let parts = this.pageData.unitContent.split(this.textStructureForChange);
				// this.pageData.unitContent = parts.join(replacement);
			}
		},

		getCursorPosition(event) {
			this.cursorPosition = event.target.selectionStart;
			console.log(this.cursorPosition);
		},

		onAddImageOnline(imageSourceOnline) {
			console.log(imageSourceOnline)
			if (this.pageData.unitContent && this.pageData.unitContent !== '' && this.cursorPosition) {

				let imageFigure = '<figure class="image"><img src="' + imageSourceOnline  + '"></figure>';

				const textBeforeCursor = this.pageData.unitContent.slice(0, this.cursorPosition);
				const textAfterCursor = this.pageData.unitContent.slice(this.cursorPosition);

				this.pageData.unitContent = textBeforeCursor + imageFigure + textAfterCursor;
			}
		}
	}
}
</script>

<style scoped lang="scss">
input[type=file]::file-selector-button {
	border: 1px dashed #BCE1A3;
	background: #656565;
	padding: 5px 20px;
	margin: 5px;
	border-radius: 5px;
	color: white;
	cursor: pointer;
	transition: background .2s ease-in-out;
	font-size: 14px;
}

input[type=file]::file-selector-button:hover {
	background: #BCE1A3;
	color: #555555;
	border: 1px dashed #555555;
}

.image-wrapper {
	padding: 5px 0;
	border-bottom: 1px dashed #BCE1A3;

	.show-image-wrapper {
		display: flex;
		flex-direction: row;

		.core-app-style__button {
			margin: 0 10px !important;
		}
	}
}
</style>