import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import * as itemCategoryTree from './ict.json';

@Injectable()
export class ReferenceService {
  getData() {
    return itemCategoryTree;
  }

  emitData(client: Socket) {
    client.emit('referenceData', this.getData());
  }
}
