import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification';

// Providing NotificationService here creates a new instance
// for this component and all of its child components.
// This instance is separate from the application's root instance,
// allowing isolated state for each NotificationComponent.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
