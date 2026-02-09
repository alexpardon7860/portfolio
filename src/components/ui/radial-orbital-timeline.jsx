import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      if (autoRotate && viewMode === "orbital") {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Rotate at approximately 0.3 degrees per 50ms = 6 degrees per second
        setRotationAngle((prev) => {
          const increment = (deltaTime / 1000) * 6; // 6 degrees per second
          return (prev + increment) % 360;
        });

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (autoRotate && viewMode === "orbital") {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Responsive radius based on screen size
    const baseRadius = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 280;
    const radius = baseRadius;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "text-slate-900 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 border-yellow-400 shadow-md shadow-yellow-500/50";
      case "in-progress":
        return "text-slate-800 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 border-slate-300 shadow-md shadow-slate-400/40";
      case "pending":
        return "text-amber-200 bg-slate-800 border-amber-500/50";
      default:
        return "text-amber-200 bg-slate-800 border-amber-500/50";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-transparent overflow-visible"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 animate-pulse flex items-center justify-center z-10 shadow-lg shadow-yellow-500/50">
            <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-yellow-400/40 animate-ping opacity-70"></div>
            <div
              className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-amber-500/30 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-white via-slate-100 to-blue-50 backdrop-blur-md shadow-inner"></div>
          </div>

          <div className="absolute w-[300px] h-[300px] md:w-[560px] md:h-[560px] rounded-full border-2 border-yellow-500/30 shadow-lg shadow-yellow-500/20"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute cursor-pointer"
                style={{
                  ...nodeStyle,
                  willChange: 'transform, opacity',
                  transition: 'transform 0.7s ease-out, opacity 0.7s ease-out'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 pointer-events-none ${isPulsing ? "animate-pulse duration-1000" : ""
                    }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
                  ${isExpanded
                      ? "bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/60"
                      : isRelated
                        ? "bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 text-slate-800 shadow-md shadow-slate-400/40"
                        : "bg-slate-800 text-amber-400 hover:bg-slate-700 hover:shadow-lg hover:shadow-amber-500/40"
                    }
                  border-2 
                  ${isExpanded
                      ? "border-yellow-400 shadow-lg shadow-yellow-400/50"
                      : isRelated
                        ? "border-slate-300 animate-pulse shadow-slate-300/50"
                        : "border-amber-500/50 hover:border-amber-400"
                    }
                  transform
                  ${isExpanded ? "md:scale-150 scale-125" : ""}
                `}
                  style={{
                    transition: 'transform 0.3s ease-out, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease'
                  }}
                >
                  <Icon size={14} className="md:w-4 md:h-4" />
                </div>

                <div
                  className={`
                  absolute top-10 md:top-12 whitespace-nowrap
                  text-xs md:text-xs font-semibold tracking-wider
                  transform
                  ${isExpanded ? "text-yellow-300 md:scale-125 scale-110" : "text-amber-300/90"}
                `}
                  style={{
                    transition: 'transform 0.3s ease-out, color 0.3s ease'
                  }}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-56 md:w-64 bg-slate-900/95 backdrop-blur-lg border-amber-500/40 shadow-xl shadow-amber-500/30 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-b from-yellow-400 to-amber-500"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-amber-500/30">
                        <div className="flex justify-between items-center text-xs mb-1 text-amber-200">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1 text-yellow-400" />
                            Energy Level
                          </span>
                          <span className="font-mono text-yellow-400">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-amber-500/30">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-lg shadow-yellow-500/50"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-amber-500/30">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-yellow-400 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-amber-200">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-md border-amber-500/40 bg-slate-800/50 hover:bg-amber-500/20 hover:border-amber-400 text-amber-200 hover:text-yellow-300 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
