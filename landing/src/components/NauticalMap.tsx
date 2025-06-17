import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box, Text, Button, Spinner } from '@chakra-ui/react';

interface NauticalMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

export function NauticalMap({ 
  initialCenter = [-81.4000, 30.2672], // Default to Jacksonville, FL
  initialZoom = 10 
}: NauticalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    try {
      // Check if WebGL is supported
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setError('WebGL is not supported in your browser. Please try a different browser.');
        return;
      }

      map.current = new maplibregl.Map({
        container: mapContainer.current!,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            },
            'openseamap': {
              type: 'raster',
              tiles: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenSeaMap contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 19
            },
            {
              id: 'openseamap',
              type: 'raster',
              source: 'openseamap',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: initialCenter,
        zoom: initialZoom,
        preserveDrawingBuffer: true,
        antialias: true,
        maxZoom: 19,
        minZoom: 2,
        renderWorldCopies: true,
        trackResize: true,
        attributionControl: true
      });

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      
      // Add scale control
      map.current.addControl(new maplibregl.ScaleControl({
        maxWidth: 200,
        unit: 'nautical'
      }));

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('MapLibre error:', e);
        setError('An error occurred while loading the map. Please try refreshing the page.');
      });

      // Handle WebGL context loss
      map.current.on('webglcontextlost', () => {
        setError('WebGL context was lost. Please refresh the page.');
      });

      map.current.on('webglcontextrestored', () => {
        setError(null);
        setMapLoaded(true);
      });

    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize the map. Please try refreshing the page.');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialCenter, initialZoom]);

  if (error) {
    return (
      <Box 
        p={4} 
        textAlign="center" 
        bg="red.50" 
        borderRadius="md"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Text color="red.500" fontSize="lg">{error}</Text>
        <Button 
          colorScheme="blue" 
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </Box>
    );
  }

  if (!mapLoaded) {
    return (
      <Box 
        height="100%" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        bg="gray.50"
      >
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Box 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }} 
    />
  );
} 