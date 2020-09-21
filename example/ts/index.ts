import Foo from "./foo";
import Tool from "./tool";

class Bar extends Foo{
    /* @olaf-mix */
    static mix(params: number, options: any){
        console.log(params);
        Tool.makeTime()
    }
}


export {
    Bar,
};
