<template>
    <the-dual-list
        :loading="false"
        :headers="[ { text: 'test', value: 'test' }, { text: 'test2', value: 'test2' } ]"
        :left-items="[ { test: 'a', test2: 'ㄱ' }, { test: 'b', test2: 'ㄴ' }, { test: 'c', test2: 'ㄷ' }, { test: 'd', test2: 'ㄹ' } ]"
        :right-items="[ { test: '1', test2: 'ㅏ' }, { test: '2', test2: 'ㅑ' }, { test: '3', test2: 'ㅓ' }, { test: '4', test2: 'ㅕ' } ]"
    >
    </the-dual-list>
</template>

<script>
import TheDualList from "@/components/TheDualList";

export default {
    name      : 'App',
    components: {
        TheDualList
    }
}
</script>

<style>
</style>
