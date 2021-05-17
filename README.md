# jokey-duallist

## installed
please pre-installed [vuetify](https://vuetifyjs.com/en/getting-started/installation/) & [icon](https://materialdesignicons.com/)
```commandline
yarn add vuetify
yarn add jokey-duallist
```
```html
<!--icon installation in index.html-->
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
```

## options

component props

```javascript
{
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
}
```

## events

emit events

```javascript
this.$emit( "onChange", { leftItems: any[], rightItems: any[] } );
```

## slots

### left-title
left list box title

### right-title
right list box title

### list-header
list box table header
```html
<!--default-->
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
```

### list-item
list box table body
```html
<!--default-->
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
```

## references
* [Vuetify](https://vuetifyjs.com/en/getting-started/installation/) 
* [Material Design Icons](https://materialdesignicons.com/)
* [SortableJS](https://github.com/SortableJS/Sortable)
* [VueScroll.js](https://vuescrolljs.yvescoding.org/)

## version log
* 1.1.0
    * import css
* 1.0.0
    * first release
    