/**
 * <h2>Table Component</h2>
 *
 * <pre>
 *     Vue Component 객체
 *
 *     props
 *     1. headers : 테이블 열 이름
 *          - type    : Array
 *          - required: true
 *     2. tableName : 테이블 이름
 *          - type    : String
 *          - required: false
 *     3. items : 테이블 로우 목록
 *          - type    : Array
 *          - required: false
 *     4. loading : API 완료 여부
 *          - type    : boolean
 *          - required: true
 *
 *     data
 *     1. pagination : 페이징 정보
 *          - limit   : 페이지 크기
 *          - page    : 페이지 번호
 *
 *     computed
 *
 *     watch
 *     1. items
 *
 *     created
 *
 *     methods
 * </pre>
 *
 * @description 테이블 공통 js
 * @author yeon-ik Jo
 */
export default {
    props   : {
        /** 테이블 열 이름 */
        headers: {
            type    : Array,
            required: true
        },
        /** 테이블 이름 */
        tableName: {
            type    : String,
            required: false
        },
        /** 테이블 로우 목록 */
        items: {
            type    : Array,
            required: false
        },
        /** API 완료 여부 */
        loading: {
            type    : Boolean,
            required: true
        }
    },
    data    : () => ( {
        /** 페이징 정보 */
        pagination: {
            /** 페이지 크기 */
            limit: 10,
            /** 페이지 번호 */
            page: 1,
        },
    } ),
    watch   : {
        items( to ) {
            if( to ) {
                this.pagination.page = 1;
                this.pagination.totalCnt = this.items.length;
            }
        }
    },
}