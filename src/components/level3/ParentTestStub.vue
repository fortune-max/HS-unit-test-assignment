<script setup>
    import { onErrorCaptured } from 'vue';
    import FetchSuspense from './FetchSuspense.vue';
    const emit = defineEmits(["error-with-child"]);

    onErrorCaptured((err) => {
        emit('error-with-child');
        return false;
    });
</script>

<template>
    <Suspense>
        <FetchSuspense />
        <template #fallback>
            Suspense fallback...
        </template>
    </Suspense>
</template>