import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';


@Pipe({
    name: 'productFilter'
})
export class SearchProductFilterPipe implements PipeTransform {
    transform(items: Product[], searchProductText: string, categoryProduct: string): Product[] {
        if (!items) return [];
        if (!searchProductText) {
            searchProductText = searchProductText.toLowerCase();
            return items.filter(it => {
                return (
                    (it.p_Type.toLowerCase().includes(categoryProduct))
                );
            });
        }
        else {
            searchProductText = searchProductText.toLowerCase();
            return items.filter(it => {
                return (
                    (it.p_Id.toString().includes(searchProductText) && it.p_Type.toLowerCase().includes(categoryProduct)) ||
                    (it.p_Name.toLowerCase().includes(searchProductText) && it.p_Type.toLowerCase().includes(categoryProduct)) ||
                    (it.p_Type.toLowerCase().includes(searchProductText) && it.p_Type.toLowerCase().includes(categoryProduct))
                );
            });
        }


    }
}