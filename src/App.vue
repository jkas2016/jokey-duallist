<template>
    <the-dual-list
        :loading="false"
        :headers="[ { text: 'test', value: 'test' } ]"
        :left-items="[ { test: 'a' } ]"
        :right-items="[ { test: 'a' } ]"
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
