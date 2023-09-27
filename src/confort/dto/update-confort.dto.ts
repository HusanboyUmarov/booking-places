import { PartialType } from '@nestjs/swagger';
import { CreateConfortDto } from './create-confort.dto';

export class UpdateConfortDto extends PartialType(CreateConfortDto) {}
