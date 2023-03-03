import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Pipe({ name: 'peelBehaviorSubject', pure: false })
export class PeelBehaviorSubjectPipe implements PipeTransform {
  transform<T>(value: T | BehaviorSubject<T>): T {
    if (value instanceof BehaviorSubject) {
      return value.value;
    }
    return value;
  }
}
