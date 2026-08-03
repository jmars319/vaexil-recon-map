export function collectReconMarkerDetailAssetIds(details) {
    return [
        ...new Set(details.flatMap((detail) => detail.payload.mediaAssetIds || [])),
    ];
}
function getViewerAssetSrc(asset, adminMode) {
    if (asset.visibility === "private") {
        return adminMode ? `/admin/recon/assets/${asset.id}` : null;
    }
    if (asset.status !== "approved") {
        return adminMode ? asset.path : null;
    }
    return asset.path;
}
function toViewerMedia(detail, assetById, adminMode) {
    if (!detail?.payload.mediaAssetIds?.length) {
        return [];
    }
    return detail.payload.mediaAssetIds.flatMap((assetId) => {
        const asset = assetById.get(assetId);
        if (!asset) {
            return [];
        }
        const src = getViewerAssetSrc(asset, adminMode);
        if (!src) {
            return [];
        }
        return [
            {
                assetId: asset.id,
                src,
                alt: asset.notes || "Recon marker media",
                caption: asset.notes || asset.sourceName || "",
                visibility: asset.visibility,
                status: asset.status,
            },
        ];
    });
}
function toViewerDetail(detail, adminMode) {
    if (!detail) {
        return undefined;
    }
    if (detail.payload.visibility === "private" && !adminMode) {
        return undefined;
    }
    return detail.payload;
}
export function buildReconViewerMarkers(markers, details, assets, options) {
    const detailByMarkerId = new Map(details.map((detail) => [detail.markerId, detail]));
    const assetById = new Map(assets.map((asset) => [asset.id, asset]));
    return markers.map((marker) => {
        const detail = detailByMarkerId.get(marker.id);
        const viewerDetail = toViewerDetail(detail, Boolean(options.adminMode));
        return {
            id: marker.id,
            label: marker.label,
            description: marker.description,
            category: marker.category,
            x: marker.x,
            y: marker.y,
            floor: marker.floor,
            iconKey: marker.iconKey,
            iconPath: options.iconPaths.get(marker.iconKey),
            hiddenByDefault: marker.hiddenByDefault,
            sourceName: marker.sourceName,
            sourceUrl: marker.sourceUrl,
            confidence: marker.confidence,
            status: marker.status,
            mode: marker.mode,
            variant: marker.variant,
            detail: viewerDetail,
            detailStatus: detail?.status,
            detailLastReviewed: detail?.lastReviewed,
            media: viewerDetail
                ? toViewerMedia(detail, assetById, Boolean(options.adminMode))
                : [],
        };
    });
}
