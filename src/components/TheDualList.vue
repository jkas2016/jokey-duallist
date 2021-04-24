<template>
    <div class="list-box-wrapper">
        <!--원본영역-->
        <div>
            <!--타이틀-->
            <v-row no-gutters class="mb-1" align="center">
                <slot name="left-title"></slot>
            </v-row>
            <!--\\타이틀-->
            <!--검색영역-->
            <v-row no-gutters class="mb-1" align="center">
                <v-col cols="12" lg="10">
                    <v-text-field
                        ref="leftSearch"
                        hide-details
                        outlined
                        dense
                        clearable
                        :placeholder="searchPlaceholder"
                        @click:clear="sourceSearch( { clear: true } )"
                        @keyup.enter="sourceSearch"
                    >
                    </v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-btn
                    color="normal"
                    @click="sourceSearch"
                >
                    {{ $t( "views.common-form.btn.search" ) }}
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
                        :list="source"
                    >
                        <!--@change="changeLog"-->
                        <li
                            class="list-item"
                            v-for="(item,key) in source"
                            :key="key"
                            :style="{backgroundColor: item.selected ? '#eeeeee':''}"
                            v-show="!item.hide"
                            @click="selectSource(key)"
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
                            v-show="source.length < 1"
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
                <v-col cols="1">{{ sourceSelectCnt + "/" + sourceAllCnt }}</v-col>
            </v-row>
            <!--\\데이터영역-->
            <div class="bulk-action">
                <v-spacer></v-spacer>
                <v-btn
                    class="select-all white--text"
                    color="grey darken-3"
                    @click="selectAllSource"
                >
                    {{ $t( "views.common-form.btn.selectAll" ) }}
                </v-btn>
                <v-btn
                    class="deselect-all"
                    color="normal"
                    @click="deSelectAllSource"
                >
                    {{ $t( "views.common-form.btn.none" ) }}
                </v-btn>
                <v-spacer></v-spacer>
            </div>
        </div>
        <!--\\원본역역-->
        <!--버튼영역-->
        <div class="actions">
            <v-btn
                class="btn-action"
                color="normal"
                @click="moveDestination"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn
                class="btn-action"
                color="normal"
                @click="moveAllDestination"
            >
                <v-icon>mdi-chevron-double-right</v-icon>
            </v-btn>
            <v-btn
                class="btn-action"
                color="normal"
                @click="moveSource"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
                class="btn-action"
                color="normal"
                @click="moveAllSource"
            >
                <v-icon>mdi-chevron-double-left</v-icon>
            </v-btn>
        </div>
        <!--\\버튼영역-->
        <!--선택영역-->
        <div>
            <!--타이틀-->
            <v-row no-gutters class="mb-1" align="center">
                <slot name="right-title"></slot>
            </v-row>
            <!--\\타이틀-->
            <!--검색영역-->
            <v-row no-gutters class="mb-1" align="center">
                <v-col cols="12" lg="10">
                    <v-text-field
                        ref="rightSearch"
                        hide-details
                        outlined
                        dense
                        clearable
                        :placeholder="searchPlaceholder"
                        @click:clear="destinationSearch( { clear: true } )"
                        @keyup.enter="destinationSearch"
                    >
                    </v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-btn
                    color="normal"
                    @click="destinationSearch"
                >
                    {{ $t( "views.common-form.btn.search" ) }}
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
                        v-for="(item,key) in destination"
                        :key="key"
                        :style="{ backgroundColor: item.selected ? '#f5f5f5':'' }"
                        v-show="!item.hide"
                        @click="selectDestination(key)"
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
                        v-show="destination.length < 1"
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
                <v-col cols="1">{{ destinationSelectCnt + "/" + destinationAllCnt }}</v-col>
            </v-row>
            <!--\\데이터영역-->
            <div class="bulk-action">
                <v-spacer></v-spacer>
                <v-btn
                    class="select-all white--text"
                    color="grey darken-3"
                    @click="selectAllDestination"
                >
                    {{ $t( "views.common-form.btn.selectAll" ) }}
                </v-btn>
                <v-btn
                    class="deselect-all"
                    color="normal"
                    @click="deSelectAllDestination"
                >
                    {{ $t( "views.common-form.btn.none" ) }}
                </v-btn>
                <v-spacer></v-spacer>
            </div>
        </div>
        <!--\\선택영역-->
    </div>
</template>

<script>
export default {
    name: "TheDualList"
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