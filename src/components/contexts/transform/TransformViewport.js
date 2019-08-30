const TransformViewPort = ({

}) => {

    const staticContext = useContext(StaticContext);

    const [{ paddingBottom, marginBottom, overflowY }, setPreviousViewportStyles] = useState({});

    useEffect(() => {
        setTimeout(() => {
            try {
                setPreviousViewportStyles({
                    paddingBottom: staticContext.Viewport.current.style.paddingBottom,
                    marginBottom: staticContext.Viewport.current.style.marginBottom,
                    overflowY: staticContext.Viewport.current.style.overflowY,
                    overflowX: staticContext.Viewport.current.style.overflowX,
                });
            } catch (err) {
                console.error(err);
            }
        });

        // setTimeout(() => {
        //     setLoadingTooLong(true);
        // }, 2000);
        
        resizeViewport();

        window.addEventListener('resize', resizeViewport);

        return () => {
            setTimeout(() => {
                try {
                    staticContext.Viewport.current.style.paddingBottom = paddingBottom;
                    staticContext.Viewport.current.style.marginBottom = marginBottom;
                    staticContext.Viewport.current.style.overflowY = overflowY;
                } catch (err) {
                    console.error(err);
                }
                window.removeEventListener('resize', resizeViewport);
            })
        };
    }, []);

    const resizeViewport = () => {
        setTimeout(() => {
            try {
                staticContext.Viewport.current.style.paddingBottom = "0";
                staticContext.Viewport.current.style.marginBottom = "0";
                staticContext.Viewport.current.style.overflowY = "hidden";
                staticContext.Viewport.current.style.overflowX = "hidden";
                // InteractiveElevation.current.style.height = `${
                //     window.innerHeight
                //     -
                //     InteractiveElevation.current.offsetTop
                //     -
                //     48}px`;
            } catch (err) {
                console.error(err);
            }
        });
    }
}