import { Module, HttpModule } from '@nestjs/common';
import { GameApiService } from './game-api.service';

@Module({
  imports: [HttpModule],
  providers: [GameApiService],
  exports: [GameApiService],
})
export class GameApiModule {}
