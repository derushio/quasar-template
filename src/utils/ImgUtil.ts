import ShortId from 'shortid';

/**
 * 画像処理ユーティルクラス
 */
export default class ImgUtil {
    /**
     * Imageをロード
     * @param url
     */
    public static async loadImg(url: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>(async (resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';

            image.onload = (): void => {
                resolve(image);
            };
            image.onerror = (e): void => {
                window.console.error('loadImg error');
                reject(e);
            };

            image.src = url;
        });
    }

    public static async loadBlob(blob: Blob): Promise<HTMLImageElement> {
        return await new Promise<HTMLImageElement>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (): Promise<void> => {
                resolve(await this.loadImg(reader.result as string));
            };
            reader.onerror = (e): void => {
                window.console.error('loadBlob error');
                reject(e);
            };

            reader.readAsDataURL(blob);
        });
    }

    public static buildFile(image: HTMLImageElement): File {
        const base64 = this.buildBase64(image);
        const buffer = this.buildBuffer(base64);
        const blob = new File(
            [buffer.buffer] as BlobPart[],
            `${ShortId()}.jpg`,
            {
                type: 'image/jpeg',
            },
        );
        return blob;
    }

    public static buildBlob(image: HTMLImageElement): Blob {
        const base64 = this.buildBase64(image);
        const buffer = this.buildBuffer(base64);
        const blob = new Blob([buffer.buffer] as BlobPart[], {
            type: 'image/jpeg',
        });
        return blob;
    }

    public static buildBuffer(base64: string): Uint8Array {
        const bin = atob(base64.replace(/^.*,/, ''));
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        return buffer;
    }

    public static buildBase64(image: HTMLImageElement): string {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d')!;
        context.drawImage(image, 0, 0);
        return canvas.toDataURL();
    }

    /**
     * 画像を切り取り
     */
    public static async crop(
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number,
    ): Promise<HTMLImageElement> {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d')!;
        context.drawImage(image, -x, -y);
        return await this.loadImg(canvas.toDataURL());
    }

    public static async resize(
        image: HTMLImageElement,
        maxWidth: number,
        maxHeight: number,
    ): Promise<HTMLImageElement> {
        const sAspect = image.naturalWidth / image.naturalHeight;
        const dAspect = maxWidth / maxHeight;
        const dSize = {
            width: maxWidth,
            height: maxHeight,
        };
        if (sAspect < dAspect) {
            dSize.width = dSize.height * sAspect;
        } else {
            dSize.height = dSize.width * (1 / sAspect);
        }

        const canvas = document.createElement('canvas');
        canvas.width = dSize.width;
        canvas.height = dSize.height;
        const context = canvas.getContext('2d')!;
        context.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            dSize.width,
            dSize.height,
        );
        return await this.loadImg(canvas.toDataURL());
    }

    public static async resizeForce(
        image: HTMLImageElement,
        width: number,
        height: number,
    ): Promise<HTMLImageElement> {
        const sAspect = image.naturalWidth / image.naturalHeight;
        const dAspect = width / height;
        const dSize = {
            width,
            height,
        };
        const offset = {
            x: 0,
            y: 0,
        };
        if (sAspect < dAspect) {
            dSize.width = dSize.height * sAspect;
            offset.x = (dSize.height - dSize.width) / 2;
        } else {
            dSize.height = dSize.width * (1 / sAspect);
            offset.y = (dSize.width - dSize.height) / 2;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d')!;
        context.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            offset.x,
            offset.y,
            dSize.width,
            dSize.height,
        );
        return await this.loadImg(canvas.toDataURL());
    }

    protected constructor() {
        // pass;
    }
}
