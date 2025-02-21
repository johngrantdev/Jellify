import { TracksProps } from "../types";
import React from "react";
import Track from "../Global/components/track";
import { FlatList, RefreshControl } from "react-native";
import { QueryKeys } from "../../enums/query-keys";
import { fetchRecentlyPlayed } from "../../api/queries/functions/recents";
import { fetchFavoriteTracks } from "../../api/queries/functions/favorites";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "tamagui";
import { QueryConfig } from "../../api/queries/query.config";

export default function TracksScreen({
    route,
    navigation
} : TracksProps) : React.JSX.Element {
    const { data: tracks, refetch, isPending } = useQuery({
        queryKey: [route.params.query],
        queryFn: () => route.params.query === QueryKeys.RecentlyPlayed 
            ? fetchRecentlyPlayed(QueryConfig.limits.recents * 2, 20) 
            : fetchFavoriteTracks()
    });

    return (
        <FlatList
            contentInsetAdjustmentBehavior="automatic"
            ItemSeparatorComponent={() => <Separator />}
            numColumns={1}
            data={tracks}
            refreshControl={
                <RefreshControl
                    refreshing={isPending}
                    onRefresh={refetch}
                />
            }
            renderItem={({ index, item: track}) =>
                <Track
                    navigation={navigation}
                    showArtwork
                    track={track}
                    tracklist={tracks?.slice(index, index + 50) ?? []}
                    queue="Favorite Tracks"
                />
            }
        />
    )
}