<template>
    <div class="list-box-wrapper">
        <!--원본영역-->
        <div>
            <!--타이틀-->
            <v-row no-gutters style="margin-bottom: 4px;" align="center">
                <slot name="left-title"></slot>
            </v-row>
            <!--\\타이틀-->
            <!--검색영역-->
            <v-row no-gutters style="margin-bottom: 4px;" align="center">
                <v-text-field
                    ref="leftSearch"
                    style="margin-right: 4px;"
                    hide-details
                    outlined
                    dense
                    clearable
                    :placeholder="searchPlaceholder"
                    @click:clear="leftSearchEvent( { clear: true } )"
                    @keyup.enter="leftSearchEvent"
                >
                </v-text-field>
                <v-btn
                    color="normal"
                    @click="leftSearchEvent"
                >
                    {{ "search" }}
                </v-btn>
            </v-row>
            <!--\\검색영역-->
            <!--데이터영역-->
            <v-row no-gutters class="list-box-header">
                <slot
                    name="list-header"
                    :headers="headers"
                >
                    <v-col
                        v-for="( x, i ) in headers"
                        :key="i"
                        :cols="12/headers.length"
                    >
                        {{ x.text }}
                    </v-col>
                </slot>
            </v-row>
            <ul class="list-box" :style="listBoxHeight">
                <the-spinner :loading="loading" is-absolute-container></the-spinner>
                <vue-scroll :ops="ops">
                    <draggable
                        :disabled="dragDisabled"
                        :list="leftItems"
                    >
                        <!--@change="changeLog"-->
                        <li
                            class="list-item"
                            v-for="(item,key) in leftItems"
                            :key="key"
                            :style="{backgroundColor: item.selected ? '#eeeeee':''}"
                            v-show="!item.hide"
                            @click="selectItemsOfLeft(key)"
                        >
                            <slot
                                name="list-item"
                                :headers="headers"
                                :item="item"
                            >
                                <v-row no-gutters>
                                    <v-col
                                        v-for="( x, i ) in headers"
                                        :key="i"
                                        :cols="12/headers.length"
                                    >
                                        {{ item[x.value] }}
                                    </v-col>
                                </v-row>
                            </slot>
                        </li>
                        <li
                            class="list-item"
                            v-show="leftItems.length < 1"
                        >
                            <v-row no-gutters>
                                <v-col cols="12" style="text-align: center;">
                                    {{ noDataTextLabel }}
                                </v-col>
                            </v-row>
                        </li>
                    </draggable>
                </vue-scroll>
            </ul>
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col cols="1">{{ leftItemsSelectCnt + "/" + leftItemsAllCnt }}</v-col>
            </v-row>
            <!--\\데이터영역-->
            <div class="bulk-action">
                <v-spacer></v-spacer>
                <v-btn
                    class="select-all white--text"
                    color="grey darken-3"
                    @click="selectAllOfLeft"
                >
                    {{ "select all" }}
                </v-btn>
                <v-btn
                    class="deselect-all"
                    color="normal"
                    @click="unselectAllOfLeft"
                >
                    {{ "unselect all" }}
                </v-btn>
                <v-spacer></v-spacer>
            </div>
        </div>
        <!--\\원본역역-->
        <!--버튼영역-->
        <div class="actions">
            <v-btn
                icon
                class="btn-action"
                color="normal"
                @click="moveRight"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn
                icon
                class="btn-action"
                color="normal"
                @click="moveAllRight"
            >
                <v-icon>mdi-chevron-double-right</v-icon>
            </v-btn>
            <v-btn
                icon
                class="btn-action"
                color="normal"
                @click="moveLeft"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
                icon
                class="btn-action"
                color="normal"
                @click="moveAllLeft"
            >
                <v-icon>mdi-chevron-double-left</v-icon>
            </v-btn>
        </div>
        <!--\\버튼영역-->
        <!--선택영역-->
        <div>
            <!--타이틀-->
            <v-row no-gutters style="margin-bottom: 4px;" align="center">
                <slot name="right-title"></slot>
            </v-row>
            <!--\\타이틀-->
            <!--검색영역-->
            <v-row no-gutters style="margin-bottom: 4px;" align="center">
                <v-text-field
                    ref="rightSearch"
                    style="margin-right: 4px;"
                    hide-details
                    outlined
                    dense
                    clearable
                    :placeholder="searchPlaceholder"
                    @click:clear="rightSearchEvent( { clear: true } )"
                    @keyup.enter="rightSearchEvent"
                >
                </v-text-field>
                <v-btn
                    color="normal"
                    @click="rightSearchEvent"
                >
                    {{ "search" }}
                </v-btn>
            </v-row>
            <!--\\검색영역-->
            <!--데이터영역-->
            <v-row no-gutters class="list-box-header">
                <slot
                    name="list-header"
                    :headers="headers"
                >
                    <v-col
                        v-for="( x, i ) in headers"
                        :key="i"
                        :cols="12/headers.length"
                    >
                        {{ x.text }}
                    </v-col>
                </slot>
            </v-row>
            <ul class="list-group-flush border rounded list-box" :style="listBoxHeight">
                <the-spinner :loading="loading" is-absolute-container></the-spinner>
                <vue-scroll :ops="ops">
                    <li
                        class="list-item"
                        v-for="(item,key) in rightItems"
                        :key="key"
                        :style="{ backgroundColor: item.selected ? '#f5f5f5':'' }"
                        v-show="!item.hide"
                        @click="selectItemsOfRight(key)"
                    >
                        <slot
                            name="list-item"
                            :headers="headers"
                            :item="item"
                        >
                            <v-row no-gutters>
                                <v-col
                                    v-for="( x, i ) in headers"
                                    :key="i"
                                    :cols="12/headers.length"
                                >
                                    {{ item[x.value] }}
                                </v-col>
                            </v-row>
                        </slot>
                    </li>
                    <li
                        class="list-item"
                        v-show="rightItems.length < 1"
                    >
                        <v-row no-gutters>
                            <v-col cols="12" style="text-align: center;">
                                {{ noDataTextLabel }}
                            </v-col>
                        </v-row>
                    </li>
                </vue-scroll>
            </ul>
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col cols="1">{{ rightItemsSelectCnt + "/" + rightItemsAllCnt }}</v-col>
            </v-row>
            <!--\\데이터영역-->
            <div class="bulk-action">
                <v-spacer></v-spacer>
                <v-btn
                    class="select-all white--text"
                    color="grey darken-3"
                    @click="selectAllOfRight"
                >
                    {{ "select all" }}
                </v-btn>
                <v-btn
                    class="deselect-all"
                    color="normal"
                    @click="unselectAllOfRight"
                >
                    {{ "unselect all" }}
                </v-btn>
                <v-spacer></v-spacer>
            </div>
        </div>
        <!--\\선택영역-->
    </div>
</template>

<script>
import vueScroll from 'vuescroll';
import draggable from 'vuedraggable';
import TheSpinner from "./TheSpinner";
import TableComponent from "./table-component";

/**
 * dual list component
 * @version 1.0
 */
export default {
    name      : "TheDualList",
    components: { TheSpinner, vueScroll, draggable },
    mixins    : [ TableComponent ],
    props     : {
        leftItems        : Array,
        rightItems       : Array,
        searchPlaceholder: String,
        /** table header (left == right) */
        headers: {
            type    : Array,
            required: true
        },
        /**
         * Header key to include in search function
         * @type [String Array]
         */
        searchHeader: Array,
        dragDisabled: {
            type   : Boolean,
            default: false
        },
        loading     : {
            type   : Boolean,
            default: false
        },
        height      : {
            type    : String,
            required: false
        },
        /** Text shown when no items are provided to the component */
        noDataText: String
    },
    data() {
        return {
            ops      : {
                vuescroll  : {},
                scrollPanel: {},
                rail       : {},
                bar        : {}
            },
            leftList : null,
            rightList: null,
        }
    },
    computed: {
        // Data area length
        listBoxHeight() {
            return this.height ?
                this.leftItems.length > 0 || this.rightItems.length > 0 ?
                    { height: this.height } : { height: "30px" }
                : null;
        },
        noDataTextLabel() {
            return this.noDataText ? this.noDataText : "No data"
        },
        // Total number of data in the source area
        leftItemsAllCnt() {
            return this.leftList ? this.leftList.filter( item => !item.hide ).length : 0;
        },
        // 원본 영역 선택 데이터 개수
        leftItemsSelectCnt() {
            return this.leftList ? this.leftList.filter( item => item.selected ).length : 0;
        },
        // 선택 영역 전체 데이터 개수
        rightItemsAllCnt() {
            return this.rightList ? this.rightList.filter( item => !item.hide ).length : 0;
        },
        // 선택 영역 선택 데이터 개수
        rightItemsSelectCnt() {
            return this.rightList ? this.rightList.filter( item => item.selected ).length : 0;
        },
    },
    watch   : {
        leftItems( to ) {
            this.leftList = to;
        },
        rightItems( to ) {
            this.rightList = to;
        }
    },
    methods : {
        moveRight() {
            const selected = this.leftList.filter( f => f.selected ).map( item => ( { ...item, selected: false } ) );
            const rightItems = [ ...this.rightList, ...selected ];
            const leftItems = this.leftList.filter( f => !f.selected );

            this.leftList = leftItems;
            this.rightList = rightItems;

            this.$emit( "onChange", { leftItems, rightItems } );
        },
        moveLeft() {
            const selected = this.rightList.filter( f => f.selected ).map( item => ( { ...item, selected: false } ) );
            const leftItems = [ ...this.leftList, ...selected ];
            const rightItems = this.rightList.filter( f => !f.selected );

            this.leftList = leftItems;
            this.rightList = rightItems;

            this.$emit( "onChange", { leftItems, rightItems } );
        },
        moveAllRight: function() {
            const rightItems = [
                ...this.rightList,
                ...this.leftList.filter( item => !item.hide ).map( item => ( { ...item, selected: false } ) )
            ];
            const leftItems = [
                ...this.leftList.filter( item => item.hide ).map( item => ( { ...item, selected: false } ) )
            ];

            this.leftList = leftItems;
            this.rightList = rightItems;

            this.$emit( "onChange", { leftItems, rightItems } );
        },
        moveAllLeft() {
            const leftItems = [
                ...this.leftList,
                ...this.rightList.filter( item => !item.hide ).map( item => ( { ...item, selected: false } ) )
            ];
            const rightItems = [
                ...this.rightList.filter( item => item.hide ).map( item => ( { ...item, selected: false } ) ),
            ];

            this.leftList = leftItems;
            this.rightList = rightItems;

            this.$emit( "onChange", { leftItems, rightItems } );
        },
        selectItemsOfRight( key ) {
            this.rightList.forEach( ( i, k ) => {
                if( k === key )
                    i.selected = !i.selected;
            } );
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
        selectItemsOfLeft( key ) {
            this.leftList.forEach( ( i, k ) => {
                if( k === key ) {
                    i.selected = !i.selected;
                }
            } );
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
        selectAllOfLeft() {
            this.leftList.forEach( item => {
                if( !item.hide )
                    item.selected = true;
            } );
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
        unselectAllOfLeft() {
            this.leftList.forEach( item => item.selected = false );
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
        selectAllOfRight() {
            this.rightList.forEach( item => {
                if( !item.hide )
                    item.selected = true;
            } );
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
        unselectAllOfRight() {
            this.rightList.forEach( item => item.selected = false );
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
        leftSearchEvent( { clear } ) {
            const search = clear ? null : this.$refs.leftSearch.lazyValue;
            let leftItems = this.leftList.map( i => {
                if( search )
                    i.hide = this.searchHeader.filter( x => i[x].indexOf( search ) > -1 ).length === 0
                else
                    i.hide = false;
                i.selected = false;
                return i;
            } );
            this.$emit( "onChange", { leftItems, rightItems: [ ...this.rightList ] } );
        },
        rightSearchEvent( { clear } ) {
            const search = clear ? null : this.$refs.rightSearch.lazyValue;
            let rightItems = this.rightList.map( i => {
                if( search )
                    i.hide = this.searchHeader.filter( x => i[x].indexOf( search ) > -1 ).length === 0
                else
                    i.hide = false;
                i.selected = false;
                return i;
            } );
            this.$emit( "onChange", { leftItems: [ ...this.leftItems ], rightItems } );
        },
        getLeftList() {
            this.$emit( "getLeftItems", [ ...this.leftList ] );
        },
        getRightList() {
            this.$emit( "getRightItems", [ ...this.rightList ] );
        },
        getLeftSelectedList() {
            const leftItems = this.leftList.filter( x => x.selected );
            this.$emit( "getSelectedLeftItems", leftItems );
        },
        getRightSelectedList() {
            const rightItems = this.rightList.filter( x => x.selected );
            this.$emit( "getSelectedLeftItems", rightItems );
        }
    },
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

.bulk-action {
  display: flex;

  .select-all {
    margin-right: 0.5rem;
  }

  .deselect-all {
    margin-left: 0.5rem;
  }
}

.list-box-wrapper {
  font-family: sans-serif;
  width: 100%;
  display: flex;
  align-items: center;

  & > div {
    flex: 1;
  }

  .actions {
    flex-grow: 0;
    padding: 0 1rem;

    .btn-action {
      margin-bottom: 0.5rem;
    }
  }

  .list-box {
    height: 250px;
    overflow: auto;
    list-style: none;
    padding: 0;
    border: solid 1px #cccccc;
    border-radius: 3px;
    margin-bottom: 0;
    position: relative;

    .list-item {
      padding: 0.2rem 1rem;
      border-bottom: solid 1px #cccccc;
      cursor: pointer;

      &:last-child {
        border: none;
      }

      input {
        border: 1px solid;
        border-radius: 5px;
        width: 100%;
        text-align: center;
      }
    }
  }
}

.btn-action {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  display: block;
  width: 100%;
  color: #fff;
  cursor: pointer;

  img {
    vertical-align: middle;
  }
}

.deselect-all {
  background-color: #6c757d;
  border-color: #6c757d;
}

.list-box-header {
  background-color: #464b55;
  color: white;
  border: thin solid #767785;
  padding: 0 1rem;
}
</style>