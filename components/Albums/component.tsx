import { useFavoriteAlbums } from "../../api/queries/favorites";
import { AlbumsProps } from "../types";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { ItemCard } from "../Global/helpers/item-card";
import { FlatList, RefreshControl } from "react-native";

export default function Albums({ navigation }: AlbumsProps) : React.JSX.Element {
    const { data: albums, refetch, isPending } = useFavoriteAlbums();

    const { width } = useSafeAreaFrame();

        return (
            <SafeAreaView edges={["left", "right"]}>
                <FlatList
                    contentInsetAdjustmentBehavior="automatic"
                    numColumns={2}
                    data={albums}
                    refreshControl={
                        <RefreshControl
                            refreshing={isPending}
                            onRefresh={refetch}
                        />
                    }
                    renderItem={({ index, item: album}) => {
                        return (
                            <ItemCard
                                itemId={album.Id!}
                                caption={album.Name ?? "Untitled Album"}
                                subCaption={album.ProductionYear?.toString() ?? ""}
                                cornered
                                onPress={() => {
                                    navigation.push("Album", { album })
                                }}
                                width={width / 2.1}
                            />
                        )
                    }}
                />
            </SafeAreaView>
        )
    }