import Vue, { VueConstructor, VNode } from 'vue';
import {
    QDialog,
    QDialogOptions,
    QCard,
    QCardSection,
    QSeparator,
    QCardActions,
    QBtn,
} from 'quasar';

import ExtendableError from 'extendable-error';

import QQDialogSize, {
    QQDialogWidth,
} from '@/plugins/quasarApiCustomize/QQDialogSize';
import { aswait } from '@/utils/AsyncTimeout';
import lo from 'lodash';

export class QQDialogCancelError extends ExtendableError {
    public constructor() {
        super('QQDialog is canceled');
    }
}

type DialogView = Vue & {
    show: () => any;
    hide: () => any;
    ok: (data: any) => any;
    cancel: () => any;
};

type OKPromise<T> = Promise<T> & { ok: () => void };

enum DialogState {
    SHOW,
    OK,
    CANCEL,
}

export default {
    open(
        this: Vue,
        options: QDialogOptions,
        handleError = true,
        def?: any,
    ): OKPromise<any> {
        const dialog = this.$q.dialog(options);
        const promise = new Promise<any>(async (resolve, reject) => {
            dialog
                .onOk((data: any) => {
                    resolve(data);
                })
                .onCancel(() => {
                    if (handleError) {
                        reject(new QQDialogCancelError());
                    } else {
                        resolve(def);
                    }
                })
                .onDismiss(() => {
                    if (handleError) {
                        reject(new QQDialogCancelError());
                    } else {
                        resolve(def);
                    }
                });
        });

        return Object.assign(promise, {
            ok: () => {
                handleError = false;
                dialog.hide();
            },
        });
    },

    alert(this: Vue, options: string | QDialogOptions): OKPromise<void> {
        if (typeof options === String.name.toLowerCase()) {
            return this.$qqDialog.open({ message: options as string }, false);
        } else {
            return this.$qqDialog.open(options as QDialogOptions, false);
        }
    },

    confirm(this: Vue, options: string | QDialogOptions): OKPromise<boolean> {
        let dialog: OKPromise<any>;
        if (typeof options === String.name.toLowerCase()) {
            dialog = this.$qqDialog.open(
                {
                    message: options as string,
                    cancel: true,
                    persistent: true,
                },
                true,
            );
        } else {
            dialog = this.$qqDialog.open(
                {
                    cancel: true,
                    persistent: true,
                    ...(options as QDialogOptions),
                },
                true,
            );
        }

        const promise = new Promise<boolean>(async resolve => {
            try {
                await dialog;
            } catch {
                resolve(false);
                return;
            }

            resolve(true);
        });

        return Object.assign(promise, { ok: dialog.ok });
    },

    prompt(
        this: Vue,
        options: string | QDialogOptions,
        handleError = true,
    ): Promise<string> {
        let dialog: OKPromise<any>;
        if (typeof options === String.name.toLowerCase()) {
            dialog = this.$qqDialog.open(
                {
                    message: options as string,
                    cancel: true,
                    prompt: {
                        model: '',
                        type: 'text',
                    },
                },
                handleError,
                '',
            );
        } else {
            dialog = this.$qqDialog.open(
                {
                    cancel: true,
                    prompt: {
                        model: '',
                        type: 'text',
                    },
                    ...(options as QDialogOptions),
                },
                handleError,
                '',
            );
        }

        return dialog;
    },

    component(
        this: Vue,
        dialogComponent: VueConstructor,
        optionsProps: QDialogOptions & { props?: any } = {},
        size: QQDialogSize = 'sm',
        needCard = false,
        handleError = true,
        def = undefined as any,
    ): Promise<any> {
        let dialog: DialogView;
        const promise = new Promise<any>(
            async (resolve, reject): Promise<void> => {
                const o = lo.clone(optionsProps);
                const props = o.props || {};
                delete o.props;
                const options = o;

                function hide(this: DialogView): void {
                    document.body.removeChild(this.$root.$el);
                    this.$root.$destroy();
                }

                function ok(this: DialogView, data: any): void {
                    hide.call(this);
                    resolve(data);
                }

                function cancel(this: DialogView): void {
                    hide.call(this);
                    if (handleError) {
                        reject(new QQDialogCancelError());
                    } else {
                        resolve(def);
                    }
                }

                this.$q.dialog({
                    ...options,
                    component: Vue.extend({
                        components: {
                            QDialog,
                            QCard,
                            QCardSection,
                            QSeparator,
                            QCardActions,
                            QBtn,
                            dialogComponent,
                        },
                        router: this.$router,
                        store: this.$store,
                        // For vue-i18n
                        // i18n: this.$i18n,
                        beforeCreate(this: DialogView): void {
                            dialog = this;
                        },
                        data: (): any => {
                            return {
                                state: DialogState.SHOW,
                            };
                        },
                        methods: {
                            async show(this: Vue): Promise<void> {
                                dialog.$data.state = DialogState.SHOW;
                                (this.$refs['dialog'] as any).show();
                                await aswait(500);
                            },
                            async hide(this: Vue): Promise<void> {
                                (this.$refs['dialog'] as any).hide();
                                await aswait(500);
                            },
                            async ok(this: Vue, data: any): Promise<void> {
                                dialog.$data.state = DialogState.OK;
                                await dialog.hide();
                                ok.call(this as any, data);
                            },
                            async cancel(this: Vue): Promise<void> {
                                dialog.$data.state = DialogState.CANCEL;
                                await dialog.hide();
                                cancel.call(this as any);
                            },
                        },
                        render: (h): VNode => {
                            return h(
                                'q-dialog',
                                {
                                    ref: 'dialog',
                                    on: {
                                        hide(this: null): void {
                                            if (
                                                dialog.$data.state ===
                                                DialogState.SHOW
                                            ) {
                                                dialog.cancel();
                                            }
                                        },
                                    },
                                },
                                needCard
                                    ? [
                                          h(
                                              'q-card',
                                              {
                                                  staticClass:
                                                      'q-dialog-plugin' +
                                                      (this.$data.dark === true
                                                          ? ' q-dialog-plugin--dark'
                                                          : ''),
                                                  style: `width: ${QQDialogWidth[size]}; max-width: 100%;`,
                                              },
                                              [
                                                  h('q-card-section', [
                                                      h('dialog-component', {
                                                          props,
                                                          on: {
                                                              ok(
                                                                  this: Vue,
                                                                  data: any,
                                                              ): void {
                                                                  dialog.ok(
                                                                      data,
                                                                  );
                                                              },
                                                              cancel(
                                                                  this: Vue,
                                                              ): void {
                                                                  dialog.cancel();
                                                              },
                                                          },
                                                      }),
                                                  ]),
                                                  h('q-separator'),
                                                  h(
                                                      'q-card-actions',
                                                      {
                                                          props: {
                                                              align: 'right',
                                                          },
                                                      },
                                                      [
                                                          h(
                                                              'q-btn',
                                                              {
                                                                  props: {
                                                                      flat: true,
                                                                      color:
                                                                          'positive',
                                                                  },
                                                                  on: {
                                                                      click: (): void => {
                                                                          dialog.ok(
                                                                              undefined,
                                                                          );
                                                                      },
                                                                  },
                                                              },
                                                              ['OK'],
                                                          ),
                                                      ],
                                                  ),
                                              ],
                                          ),
                                      ]
                                    : [
                                          h('dialog-component', {
                                              props,
                                              on: {
                                                  ok(
                                                      this: Vue,
                                                      data: any,
                                                  ): void {
                                                      dialog.ok(data);
                                                  },
                                                  cancel(this: Vue): void {
                                                      dialog.cancel();
                                                  },
                                              },
                                              staticClass:
                                                  'q-dialog-plugin' +
                                                  (this.$data.dark === true
                                                      ? ' q-dialog-plugin--dark'
                                                      : ''),
                                              style: `width: ${QQDialogWidth[size]}; max-width: 100%;`,
                                          }),
                                      ],
                            );
                        },
                    }),
                });
            },
        );

        return Object.assign(promise, {
            ok: () => {
                handleError = false;
                dialog.hide();
            },
        });
    },
};
