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
            <ul class="list-box" :style="{ height: listBoxHeight }">
                <li
                    class="list-item"
                    v-show="leftList.length < 1"
                >
                    <v-row no-gutters>
                        <v-col cols="12" style="text-align: center;">
                            {{ noDataTextLabel }}
                        </v-col>
                    </v-row>
                </li>
                <the-spinner :loading="loading" is-absolute-container></the-spinner>
                <vue-scroll :ops="ops">
                    <transition-group ref="leftList" id="leftList" tag="div" type="transition" :style="{ 'min-height': listBoxHeight }">
                        <li
                            class="list-item"
                            v-for="(item,key) in leftItems"
                            :key="key"
                            v-show="!item.hide"
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
                    </transition-group>
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
            <v-icon>mdi-chevron-right</v-icon>
            <v-icon>mdi-chevron-left</v-icon>
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
            <ul class="list-group-flush border rounded list-box" :style="{ height: listBoxHeight }">
                <li
                    class="list-item"
                    v-show="rightList.length < 1"
                >
                    <v-row no-gutters>
                        <v-col cols="12" style="text-align: center;">
                            {{ noDataTextLabel }}
                        </v-col>
                    </v-row>
                </li>
                <the-spinner :loading="loading" is-absolute-container></the-spinner>
                <vue-scroll :ops="ops">
                    <transition-group ref="rightList" id="rightList" tag="div" type="transition" :style="{ 'min-height': listBoxHeight }">
                        <li
                            class="list-item"
                            v-for="(item,key) in rightItems"
                            :key="key"
                            v-show="!item.hide"
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
                    </transition-group>
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
import TheSpinner from "./TheSpinner";
import TableComponent from "./table-component";
import { Sortable } from 'sortablejs';

/**
 * dual list component
 * @version 1.0
 */
export default {
    name      : "TheDualList",
    components: { TheSpinner, vueScroll },
    mixins    : [ TableComponent ],
    props     : {
        /**
         * left area item
         * @example [
         *      { "test1": "a", "test2": "1" },
         *      ...
         * ]
         */
        leftItems: Array,
        /** same to left-items */
        rightItems: Array,
        /** placeholder in searching input */
        searchPlaceholder: String,
        /**
         * table header (left == right)
         * @type {{type: ArrayConstructor, required: boolean}}
         * @example [
         *      { "text": "key1", "value": "test1" },
         *      { "text": "key2", "value": "test2" },
         *      ...
         * ]
         */
        headers: {
            type    : Array,
            required: true
        },
        /** drag disabled */
        dragDisabled: {
            type   : Boolean,
            default: false
        },
        /** loading spinner view flag */
        loading: {
            type   : Boolean,
            default: false
        },
        /** left&right list box height */
        height: {
            type    : String,
            required: false
        },
        /** Text shown when no items are provided to the component */
        noDataText: String
    },
    data() {
        return {
            ops            : {
                vuescroll  : {},
                scrollPanel: {},
                rail       : {},
                bar        : {}
            },
            leftList       : null,
            rightList      : null,
            draggableOption: {
                group    : "dual",
                disabled : this.dragDisabled,
                animation: 200,
                multiDrag: true,
                // Class name for selected item
                selectedClass: "sortable-selected",

                onEnd     : ( evt ) => {
                    evt.items.forEach( el => Sortable.utils.deselect( el ) );
                },
                onAdd     : ( { from, to, oldIndex, newIndex, oldIndicies, newIndicies } ) => {
                    this.moveItems(
                        from.id,
                        to.id,
                        oldIndicies.length > 0 ? oldIndicies.map( x => x.index ) : [ oldIndex ],
                        newIndicies.length > 0 ? newIndicies[0].index : [ newIndex ]
                    );
                },
                onUpdate  : ( { target, oldIndicies, newIndicies } ) => {
                    this.updateItems( target.id, oldIndicies.map( x => x.index ), newIndicies[0].index );
                },
                onSelect  : ( { target, newIndicies } ) => {
                    this.selectItem( target.id, newIndicies.map( x => x.index ) );
                },
                onDeselect: ( { target, newIndicies } ) => {
                    this.selectItem( target.id, newIndicies.map( x => x.index ) );
                }
            },
        }
    },
    computed: {
        /**
         * Data area length
         * @return {String|string}
         */
        listBoxHeight() {
            return this.height ?
                this.leftItems.length > 0 || this.rightItems.length > 0 ?
                    this.height : "30px"
                : "250px";
        },
        noDataTextLabel() {
            return this.noDataText ? this.noDataText : "No data"
        },
        leftItemsAllCnt() {
            return this.leftList ? this.leftList.filter( item => !item.hide ).length : 0;
        },
        leftItemsSelectCnt() {
            return this.leftList ? this.leftList.filter( item => item.selected ).length : 0;
        },
        rightItemsAllCnt() {
            return this.rightList ? this.rightList.filter( item => !item.hide ).length : 0;
        },
        rightItemsSelectCnt() {
            return this.rightList ? this.rightList.filter( item => item.selected ).length : 0;
        },
    },
    watch   : {
        leftItems( to ) {
            this.leftList = [ ...to ];
        },
        rightItems( to ) {
            this.rightList = [ ...to ];
        }
    },
    created() {
        this.leftList = [ ...this.leftItems ];
        this.rightList = [ ...this.rightItems ];
    },
    mounted() {
        this.$nextTick( () => {
            new Sortable( this.$refs.leftList.$el, this.draggableOption );
            new Sortable( this.$refs.rightList.$el, this.draggableOption );
        } );
    },
    methods: {
        /**
         * Drag multiple items to different area
         * @param from
         * @param to
         * @param oldIndexes
         * @param newIndex
         */
        moveItems( from, to, oldIndexes, newIndex ) {
            const selected = this[from].filter( ( x, i ) => oldIndexes.indexOf( i ) > -1 );
            this[from] = this[from].filter( ( x, i ) => oldIndexes.indexOf( i ) === -1 );
            this[to].splice( newIndex, 0, ...selected );
            this.changeList();
        },
        /**
         * Drag multiple items in area
         * @param target
         * @param oldIndexes
         * @param newIndex
         */
        updateItems( target, oldIndexes, newIndex ) {
            const selected = this[target].filter( ( x, i ) => oldIndexes.indexOf( i ) > -1 );
            this[target] = this[target].filter( ( x, i ) => oldIndexes.indexOf( i ) === -1 );
            this[target].splice( newIndex, 0, ...selected );
            this.changeList();
        },
        /**
         * item click
         * @param target
         * @param indexes
         */
        selectItem( target, indexes ) {
            this[target] = this[target].map( ( x, i ) => {
                x.selected = indexes.indexOf( i ) > -1;
                return x;
            } );
        },
        /**
         * Select all visible items of left area
         */
        selectAllOfLeft() {
            this.$refs.leftList.$el.children
                .forEach( el => {
                    if( el.classList.value.indexOf( "sortable-hide" ) === -1 ) Sortable.utils.select( el )
                } );
        },
        /**
         * Unselect all visible items of left area
         */
        unselectAllOfLeft() {
            this.$refs.leftList.$el.children.forEach( el => Sortable.utils.deselect( el ) );
        },
        /**
         * Select all visible items of right area
         */
        selectAllOfRight() {
            this.$refs.rightList.$el.children
                .forEach( el => {
                    if( el.classList.value.indexOf( "sortable-hide" ) === -1 ) Sortable.utils.select( el )
                } );
        },
        /**
         * Unselect all visible items of right area
         */
        unselectAllOfRight() {
            this.$refs.rightList.$el.children.forEach( el => Sortable.utils.deselect( el ) );
        },
        leftSearchEvent( { clear } ) {
            const search = clear ? null : this.$refs.leftSearch.lazyValue;

            // sortable-hide class add or remove
            this.$refs.leftList.$el.children.forEach( el => {
                if( !search || el.innerText.indexOf( search ) > -1 )
                    el.classList.value = el.classList.value.replaceAll( " sortable-hide", "" );
                else el.classList.value = el.classList.value + " sortable-hide";
            } );
        },
        rightSearchEvent( { clear } ) {
            const search = clear ? null : this.$refs.rightSearch.lazyValue;

            // sortable-hide class add or remove
            this.$refs.rightList.$el.children.forEach( el => {
                if( !search || el.innerText.indexOf( search ) > -1 )
                    el.classList.value = el.classList.value.replaceAll( " sortable-hide", "" );
                else el.classList.value = el.classList.value + " sortable-hide";
            } );
        },
        changeList() {
            this.$emit( "onChange", { leftItems: [ ...this.leftList ], rightItems: [ ...this.rightList ] } );
        },
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

  .list-box-header {
    background-color: #464b55;
    color: white;
    border: thin solid #767785;
    padding: 0 1rem;
  }

  .list-box {
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

      input {
        border: 1px solid;
        border-radius: 5px;
        width: 100%;
        text-align: center;
      }
    }

    .sortable-selected {
      background-color: #eeeeee
    }

    .sortable-hide {
      display: none;
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
  width: 100%;
  cursor: pointer;

  img {
    vertical-align: middle;
  }
}

.deselect-all {
  background-color: #6c757d;
  border-color: #6c757d;
}

.flip-list-move {
  transition: transform 0.5s;
}

</style>