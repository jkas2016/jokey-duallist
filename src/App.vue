<template>
    <the-dual-list
        :loading="false"
        :headers="[ { text: 'test', value: 'test' } ]"
        :left-items="[ { test: 'a' }, { test: 'b' }, { test: 'c' }, { test: 'd' } ]"
        :right-items="[ { test: '1' }, { test: '2' }, { test: '3' }, { test: '4' } ]"
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
