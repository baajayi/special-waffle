export default class ProductList {
    
    constructor(category, tag, dataSource) {
        this.category = category;
        this.tag = tag;
        this.dataSource = dataSource;
      }

    async init(){
        const list = await this.dataSource.getData();
    }

}