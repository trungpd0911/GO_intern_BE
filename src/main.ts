declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const seedService = app.get(SeedService);
  // await seedService.seedDataFromCsv("./dataSeeder/diem_thi_thpt_2024.csv");
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
