// IMPORTS
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, customElement} from 'aurelia-templating';


// CLASS ATTRIBUTES
@customElement('aup-tabs')
@inject(Element, EventAggregator)


// PUBLIC CLASS
export class Tabs {
  // PRIVATE PROPERTIES (DI)
  _element;
  _eventAggregator;

  // BINDABLE PROPERTIES
  @bindable class = 'nav-tabs';
  @bindable tabs;
  @bindable translate = false;

  // CONSTRUCTOR
  constructor(element, eventAggregator) {
    this._element = element;
    this._eventAggregator = eventAggregator;
  }

  // LIFECYCLE HANDLERS
  attached() {
    this._refresh();
  }

  // BINDABLE METHODS
  tabsChanged() {
    this._refresh();
  }

  // PUBLIC METHODS
  click(tab, event) {
    event.stopPropagation();
    if (tab.disabled) return;
    const target = event.target;
    const active = this._element.querySelector('a.nav-link.active');
    if (target === active) return;
    const targetHref = target.getAttribute('href');
    target.classList.add('active');
    document.querySelector(targetHref).classList.add('active');
    if (active) {
      const activeHref = active.getAttribute('href');
      active.classList.remove('active');
      document.querySelector(activeHref).classList.remove('active');
    }
    this._eventAggregator.publish(`aurelia-plugins:tabs:tab-clicked:${targetHref.replace('#', '')}`, event);
  }

  // PRIVATE METHODS
  _refresh() {
    const active = this.tabs.find(tab => tab.active);
    if (!active) return;
    const element = document.querySelector(`#${active.id}`);
    if (element) element.classList.add('active');
  }
}