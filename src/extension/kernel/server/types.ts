/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { Logs } from '@tensorflow/tfjs-layers/dist/logs';
import type { Tensor } from '@tensorflow/tfjs';
import { Layer } from '@tensorflow/tfjs-layers/dist/engine/topology';
import { LayersModel } from '@tensorflow/tfjs-layers/dist/engine/training';
import type {
    BarChartOpts,
    ConfusionMatrixData,
    ConfusionMatrixOptions,
    HeatmapData,
    HeatmapOptions,
    HistogramOpts,
    SurfaceInfo,
    TableData,
    TypedArray,
    XYPlotData,
    XYPlotOptions
} from '@tensorflow/tfjs-vis';

type BaseMessage<T extends string, B = {}> = {
    type: T;
    requestId?: number;
} & B;
export type CodeObject = {
    code: string;
    fileName: string;
};
export type RequestType = RunCellRequest | PingRequest | InitializeRequest | TensorFlowVisRequest;
export type RunCellRequest = BaseMessage<
    'cellExec',
    {
        code: CodeObject;
    }
>;

export type PingRequest = BaseMessage<'ping'>;
export type InitializeRequest = BaseMessage<'initialize'>;
export type TensorFlowVisRequest = BaseMessage<
    'tensorFlowVis',
    | { request: 'history'; requestId: number; success: boolean; error?: Error }
    | { request: 'barchart'; requestId: number; success: boolean; error?: Error }
    | { request: 'confusionMatrix'; requestId: number; success: boolean; error?: Error }
    | { request: 'scatterplot'; requestId: number; success: boolean; error?: Error }
    | { request: 'linechart'; requestId: number; success: boolean; error?: Error }
    | { request: 'histogram'; requestId: number; success: boolean; error?: Error }
    | { request: 'modelSummary'; requestId: number; success: boolean; error?: Error }
    | { request: 'layer'; requestId: number; success: boolean; error?: Error }
    | { request: 'valuesDistribution'; requestId: number; success: boolean; error?: Error }
    | { request: 'showPerClassAccuracy'; requestId: number; success: boolean; error?: Error }
    | { request: 'heatmap'; requestId: number; success: boolean; error?: Error }
>;

// Responses
export type ResponseType =
    | RunCellResponse
    | PingResponse
    | LogMessage
    | ReplRestarted
    | Initialized
    | OutputResponse
    | TensorFlowVis;
export type LogMessage = BaseMessage<
    'logMessage',
    {
        message: string;
        category: 'info' | 'error';
    }
>;
export type RunCellResponse = BaseMessage<
    'cellExec',
    {
        result?: DisplayData;
        ex?: Error | { name?: string; message?: string; stack?: string };
        success: boolean;
    }
>;
export type OutputResponse = BaseMessage<
    'output',
    {
        data?: DisplayData;
        ex?: Error | { name?: string; message?: string; stack?: string };
    }
>;
export type PingResponse = BaseMessage<'pong'>;
export type ReplRestarted = BaseMessage<'replRestarted'>;
export type Initialized = BaseMessage<'initialized'>;

// Data types
export type DisplayData =
    | string
    | Base64Image
    | TensorData
    | ArrayData
    | JsonData
    | HtmlData
    | { type: 'multi-mime'; data: DisplayData[] };
type Base64Image = BaseMessage<'image', { value: string; mime: string; ext: string }>;
type TensorData = BaseMessage<'tensor', { value: any }>;
type ArrayData = BaseMessage<'array', { value: any }>;
type JsonData = BaseMessage<'json', { value: any }>;
type HtmlData = BaseMessage<'html', { value: string }>;

// TensorFlow
export type TensorFlowVis =
    | BaseMessage<'tensorFlowVis', { request: 'setActiveTab'; tabName: string }>
    | BaseMessage<'tensorFlowVis', { request: 'show' }>
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'registerFitCallback';
              container: SurfaceInfo | string;
              metrics: string[];
              opts?: {};
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'fitCallback';
              container: SurfaceInfo | string;
              handler: string;
              iteration: number;
              log: Logs;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'history';
              container: SurfaceInfo | string;
              history: {};
              metrics: string[];
              opts?: {};
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'table';
              container: SurfaceInfo | string;
              data: TableData;
              opts?: {
                  fontSize?: number;
              };
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'histogram';
              container: SurfaceInfo | string;
              data:
                  | Array<{
                        value: number;
                    }>
                  | number[]
                  | TypedArray;
              opts?: HistogramOpts;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'linechart';
              container: SurfaceInfo | string;
              data: XYPlotData;
              opts?: XYPlotOptions;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'scatterplot';
              container: SurfaceInfo | string;
              data: XYPlotData;
              opts?: XYPlotOptions;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'confusionMatrix';
              container: SurfaceInfo | string;
              data: ConfusionMatrixData;
              opts?: ConfusionMatrixOptions;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'heatmap';
              container: SurfaceInfo | string;
              data: HeatmapData;
              opts?: HeatmapOptions;
              isTensor: boolean;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'showPerClassAccuracy';
              container: SurfaceInfo | string;
              classAccuracy: Array<{
                  accuracy: number;
                  count: number;
              }>;
              classLabels?: string[];
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'valuesDistribution';
              container: SurfaceInfo | string;
              tensor: Tensor;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'layer';
              container: SurfaceInfo | string;
              layer: Layer;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'barchart';
              container: SurfaceInfo | string;
              data: Array<{
                  index: number;
                  value: number;
              }>;
              opts?: BarChartOpts;
          }
      >
    | BaseMessage<
          'tensorFlowVis',
          {
              request: 'modelSummary';
              container: SurfaceInfo | string;
              model: LayersModel;
          }
      >;
