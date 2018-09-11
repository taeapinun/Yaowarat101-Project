import { Pipe, PipeTransform } from '@angular/core';
import { Cart } from './cart';


@Pipe({
    name: 'productFilter'
})
export class SearchProductFilterPipe implements PipeTransform {
    transform(items: Cart[], searchProductText: string): Cart[] {
        if (!items) return [];
        if (!searchProductText) return items;
        searchProductText = searchProductText.toLowerCase();
        return items.filter(it => {
            // return (
            //     it.p_Id.toString().includes(searchProductText) ||
            //     it.p_Name.toLowerCase().includes(searchProductText) ||
            //     it.p_Type.toLowerCase().includes(searchProductText)
            // );
            return null;
        });
    }
}