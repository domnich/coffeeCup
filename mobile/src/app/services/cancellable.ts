import { Subscription } from 'rxjs/Subscription';

export class Cancellable {
  protected requests = new Subscription();
  protected subscriptions = new Subscription();

  protected addSubscriptionToStack(subscription: any) {
    this.subscriptions.add(subscription);
  }

  protected cancelSubscriptions() {
    this.subscriptions.unsubscribe();
  }

  protected addRequestToStack(request: Subscription) {
    this.requests.add(request);
  }

  protected cancelRequests() {
    this.requests.unsubscribe();
  }
}