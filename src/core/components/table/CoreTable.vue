<template>
    <div>
        <table
                v-if="!loadingTable"
                class="table table-hover table-bordered">
            <thead>
            <tr>
                <th
                        v-for="(field, index) in fields"
                        :key="index"
                        scope="col">
                    {{ field['label'] }}
                </th>

            </tr>
            </thead>
            <tbody>
            <tr
                    v-for="(item, index) in items"
                    :key="index">
                <td v-for="(field, i) in fields"
                    :key="i"
                >
                    <p v-if="field['key']==='no'">{{ index + 1 }}</p>
                    <span
                            v-if="item[field['key']]"
                    >
                        <core-dynamic :string="item[field['key']]"/>
                    </span>
                </td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">
                        <div class="custom-table-footer" >
                            <div class="items-per-page">
                                <select v-model="paginationData.itemPerPage" class="form-select form-select-sm" aria-label=".form-select-lg">
                                    <option value="5" selected>5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <div class="custom-pagination">
                                <ul class="pagination justify-content-end">
                                    <li class="page-item">
                                        <a
                                            @click="gotoFirstPage()"
                                            class="page-link">{{ paginationData.pageLinkItems.firstPage }}</a>
                                    </li>
                                    <li class="page-item">
                                        <a
                                                @click="gotoPreviousPage()"
                                                class="page-link">{{ paginationData.pageLinkItems.previousPage }}</a>
                                    </li>
                                    <li
                                            v-for="(page, index) in paginationData.pageLinkItems.pages"
                                            :key="index"
                                            class="page-item">
                                        <a
                                                @click="gotoPageNumber(page.numberPage, index)"
                                                :class="{active: page.isActive}"
                                                class="page-link">{{ page.text }}</a>
                                    </li>
                                    <li class="page-item">
                                        <a
                                                @click="gotoNextPage()"
                                                class="page-link">{{ paginationData.pageLinkItems.nextPage }}</a>
                                    </li>
                                    <li class="page-item">
                                        <a
                                                @click="gotoLastPage()"
                                                class="page-link">{{ paginationData.pageLinkItems.lastPage }}</a>
                                    </li>
                                </ul>
                            </div>
                            <core-button :is-reload-icon="true" :reloading="reload" @click="reload=!reload"/>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
        <table v-else>
            <core-skeleton/>
        </table>
    </div>
</template>

<script>
    import CoreButton from "@/core/components/button/CoreButton";
    import CoreSkeleton from "@/core/components/skeleton/CoreSkeleton";
    // import CoreSkeleton from "@/core/components/skeleton/CoreSkeleton";
    import CoreDynamic from "@/core/components/base/CoreDynamic";

    export default {
        name: "CoreTable",
        props: {
            items: {
                type: Array,
                default () {
                    return []
                }
            },
            fields: {
                type: Array,
                default () {
                    return []
                }
            },
            loadingTable: {
                type: [Boolean],
                default: false
            }
        },
        data () {
            return {
                reload: false,
                paginationData: {
                    activePageNumber: 1,
                    totalItems: 0,
                    itemPerPage: 0,
                    totalPages: 0,
                    pageLinkItems: {
                        firstPage: '<<',
                        previousPage: '<',
                        pages: [
                            {
                                numberPage: 1,
                                text: '1',
                                isActive: true,
                                show: true,
                                canChoose: true
                            },
                            {
                                numberPage: 2,
                                text: '2',
                                isActive: false,
                                show: true,
                                canChoose: true
                            },
                            {
                                numberPage: 3,
                                text: '3',
                                isActive: false,
                                show: true,
                                canChoose: true
                            },
                            {
                                numberPage: 4,
                                text: '4',
                                isActive: false,
                                show: true,
                                canChoose: true
                            },
                        ],
                        nextPage: '>',
                        lastPage: '>>'
                    }
                }
            }
        },
        components: {
            CoreSkeleton,
            CoreButton,
            // CoreSkeleton
            CoreDynamic
        },
        created() {
            // v-html="item[field['key']]"
            this.paginationData.itemPerPage = 5;
            this.paginationData.totalItems = 50;
            this.paginationData.totalPages = this.paginationData.totalItems/this.paginationData.itemPerPage;
        },
        methods: {
            parseTotalItemsToListPageNumber () {
                // if(this.paginationData.totalItems > 0) {
                //
                // }
            },
            gotoPageNumber(number, index) {
                if(this.paginationData.totalItems > 0 && number && !this.paginationData.pageLinkItems.pages[index].isActive) {

                    this.paginationData.activePageNumber = number;

                    //
                    if(this.paginationData.activePageNumber > this.paginationData.pageLinkItems.pages[(this.paginationData.pageLinkItems.pages.length)/2].numberPage
                        && this.paginationData.activePageNumber < this.paginationData.totalPages
                        && this.paginationData.pageLinkItems.pages[this.paginationData.pageLinkItems.pages.length-1].numberPage < this.paginationData.totalPages
                    ) {

                        this.paginationData.pageLinkItems.pages.forEach((element) => {
                            if(element.numberPage < this.paginationData.totalPages) {
                                element.numberPage++;
                                element.text = element.numberPage.toString();
                            }
                        })
                    }

                    if(this.paginationData.activePageNumber < this.paginationData.pageLinkItems.pages[(this.paginationData.pageLinkItems.pages.length)/2].numberPage
                        && this.paginationData.pageLinkItems.pages[0].numberPage > 1
                    ) {
                        this.paginationData.pageLinkItems.pages.forEach((element) => {
                            if(element.numberPage > 1) {
                                element.numberPage--;
                                element.text = element.numberPage.toString();
                            }
                        })
                    }

                    // Active page
                    this.paginationData.pageLinkItems.pages.forEach((element) => {
                        element.isActive = false
                        if(element.numberPage === this.paginationData.activePageNumber) {
                            element.isActive = true;
                        }
                    })
                }
            },
            gotoFirstPage() {
                if(this.paginationData.totalItems > 0) {
                    this.paginationData.activePageNumber = 1;
                    let subtract = this.paginationData.pageLinkItems.pages[0].numberPage - 1;

                    if(subtract > 0) {
                        this.paginationData.pageLinkItems.pages.forEach((element) => {
                            element.numberPage -= subtract;
                            element.text = element.numberPage.toString();
                        })
                    }
                    // Active page
                    this.paginationData.pageLinkItems.pages.forEach((element) => {
                        element.isActive = false
                        if(element.numberPage === this.paginationData.activePageNumber) {
                            element.isActive = true;
                        }
                    })
                }
            },
            gotoPreviousPage() {
                if(this.paginationData.totalItems > 0) {

                    if (this.paginationData.activePageNumber > 1) {
                        this.paginationData.activePageNumber--;

                        if (this.paginationData.pageLinkItems.pages[0].numberPage > 1) {
                            this.paginationData.pageLinkItems.pages.forEach((element) => {
                                if(element.numberPage > 1) {
                                    element.numberPage--;
                                    element.text = element.numberPage.toString();
                                }
                            })
                        }
                        // Active page
                        this.paginationData.pageLinkItems.pages.forEach((element) => {
                            element.isActive = false
                            if(element.numberPage === this.paginationData.activePageNumber) {
                                element.isActive = true;
                            }
                        })
                    }
                }
            },
            gotoNextPage() {
                if(this.paginationData.totalItems > 0) {

                    if (this.paginationData.activePageNumber < this.paginationData.totalPages) {
                        this.paginationData.activePageNumber++;

                        if (this.paginationData.pageLinkItems.pages[this.paginationData.pageLinkItems.pages.length-1].numberPage < this.paginationData.totalPages) {
                            this.paginationData.pageLinkItems.pages.forEach((element) => {
                                if(element.numberPage < this.paginationData.totalPages) {
                                    element.numberPage++;
                                    element.text = element.numberPage.toString();
                                }
                            })
                        }
                        // Active page
                        this.paginationData.pageLinkItems.pages.forEach((element) => {
                            element.isActive = false
                            if(element.numberPage === this.paginationData.activePageNumber) {
                                element.isActive = true;
                            }
                        })
                    }
                }
            },
            gotoLastPage() {
                if(this.paginationData.totalItems > 0) {
                    this.paginationData.activePageNumber = this.paginationData.totalPages;
                    let add = this.paginationData.totalPages - this.paginationData.pageLinkItems.pages[this.paginationData.pageLinkItems.pages.length-1].numberPage;

                    if(add > 0) {
                        this.paginationData.pageLinkItems.pages.forEach((element) => {
                            element.numberPage += add;
                            element.text = element.numberPage.toString();
                        })
                    }

                    // Active page
                    this.paginationData.pageLinkItems.pages.forEach((element) => {
                        element.isActive = false
                        if(element.numberPage === this.paginationData.activePageNumber) {
                            element.isActive = true;
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .custom-table-footer {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }
    .items-per-page {
        width: 100px;
    }
    ul.pagination {
        margin-bottom: 0px;
    }
    .custom-pagination {
        margin: 5px 10px;

        li {
            cursor: pointer;
            user-select: none;
        }
    }
</style>