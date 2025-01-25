import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { QueryConfig } from "../query.config";

export function fetchItemImage(itemId: string, imageType?: ImageType, size?: number) {
    
    return getImageApi(Client.api!)
        .getItemImage({ 
            itemId, 
            imageType: imageType ? imageType : ImageType.Primary,
            width: size ? Math.floor(size) : QueryConfig.playerArtwork.width,
            height: size ? Math.floor(size) : QueryConfig.playerArtwork.height
        }, {
            responseType: 'blob'
        })
        .then((response) => {
            console.log(response)
            return URL.createObjectURL(response.data)
        });
}