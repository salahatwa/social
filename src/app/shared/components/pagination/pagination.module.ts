import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatePipe } from './paginate.pipe';
import { PaginationService } from './pagination.service';

export { PaginatePipe } from './paginate.pipe';
export { PaginationInstance } from './pagination-instance';
export { PaginationService } from './pagination.service';

import {
    NgbPagination,
    NgbPaginationEllipsis,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationNext,
    NgbPaginationNumber,
    NgbPaginationPrevious
  } from './pagination';

  export {
    NgbPagination,
    NgbPaginationEllipsis,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationNext,
    NgbPaginationNumber,
    NgbPaginationPrevious
  } from './pagination';
  export {NgbPaginationConfig} from './pagination-config';
  
  const DIRECTIVES = [
    NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber,
    NgbPaginationPrevious
  ];

  

@NgModule({
    imports: [CommonModule],
    declarations: [
        DIRECTIVES,
        PaginatePipe
    ],
    providers: [PaginationService],
    exports: [PaginatePipe,DIRECTIVES]
})
export class PaginationModule { }
