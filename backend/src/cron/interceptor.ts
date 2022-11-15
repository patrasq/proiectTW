import { Scheduled } from 'nestjs-cron';
import { ProductService } from 'src/product/product.service';

@Scheduled()
export class CronJob {
    constructor(
        private readonly productService: ProductService,
    ) { }
    async handleAlert() {
        const products = await this.productService.findAll();
        const fiveDays = 5 * 24 * 60 * 60 * 1000;
        const now = new Date();
        const fiveDaysFromNow = new Date(now.getTime() + fiveDays);
        products.forEach(async (product) => {
            if (product.expirationDate < fiveDaysFromNow) {
                return {
                    status: 'red',
                }
                // await this.alertService.create({
                //     product_id: product.id,
                //     alert_type: 'expiration',
                //     status: 'red',
                //     alert_message: `Product ${product.name} is about to expire`,
                // });
            } else {
                return {
                    status: 'green',
                }
                // await this.alertService.create({
                //     product_id: product.id,
                //     alert_type: 'expiration',
                //     status: 'green',
                //     alert_message: `Product ${product.name} is not about to expire`,
                // });
            }
        });
    }
}