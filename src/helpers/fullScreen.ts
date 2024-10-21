//Go to full screen if Phone & page is Chat
export function toggleFullScreen1() {
    
}

export const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};