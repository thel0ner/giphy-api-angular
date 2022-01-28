export type GiphyImageData = {
    url: string,
    width: string,
    height: string,
    size?: string,
    mp4?: string,
    mp4_size?: string,
    webp?: string,
    webp_size?: string,
};
export type GiphyImages = {
    fixed_height: GiphyImageData,
    fixed_height_still: GiphyImageData,
    fixed_height_downsampled: GiphyImageData,
    fixed_width: GiphyImageData,
    fixed_width_still: GiphyImageData,
    fixed_width_downsampled: GiphyImageData,
    fixed_height_small: GiphyImageData,
    fixed_height_small_still: GiphyImageData,
    fixed_width_small: GiphyImageData,
    fixed_width_small_still: GiphyImageData,
    downsized: GiphyImageData,
    downsized_still: GiphyImageData,
    downsized_large: GiphyImageData,
    downsized_medium: GiphyImageData,
    downsized_small: GiphyImageData,
    original: GiphyImageData,
    original_still: GiphyImageData,
    looping: {
        mp4: string,
    },
    preview: {
        mp4: string,
    },
    preview_gif: GiphyImageData
}