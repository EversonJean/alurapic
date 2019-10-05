import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../alert.service';
import { Alert, AlertType } from '../alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() timeout = 3000;

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.getAlert().subscribe(alert => {
      if (!alert) {
        this.alerts = [];
        return;
      }

      this.alerts.push(alert);

      setTimeout(() => this.removeAlert(alert), this.timeout);
    });
  }

  ngOnInit() {
  }

  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter(alert => alert != alertToRemove);
  }

  getAlertClass(alert: Alert) {
    if (alert) {
      return '';
    }

    switch (alert.alertType) {
      case AlertType.danger:
        return 'alert alert-danger';
        
      case AlertType.info:
        return 'alert alert-info';

        case AlertType.success:
        return 'alert alert-success';

      case AlertType.warning:
        return 'alert alert-warning';
    }
  }

}
