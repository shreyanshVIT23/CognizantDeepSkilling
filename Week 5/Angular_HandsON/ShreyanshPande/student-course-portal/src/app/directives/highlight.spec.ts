import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: {} } as ElementRef;
    const directive = new HighlightDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
