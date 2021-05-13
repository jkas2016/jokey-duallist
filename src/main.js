import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Sortable, { MultiDrag } from 'sortablejs';

Vue.config.productionTip = false;

// Cherrypick extra plugins
Sortable.mount( new MultiDrag() );

new Vue( {
    vuetify,
    render: h => h( App ),
} ).$mount( '#app' );
